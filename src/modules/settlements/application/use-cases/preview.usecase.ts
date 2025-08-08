import { IConsortiumRepository } from 'src/modules/consortiums/domain/interfaces/repository.interface';
import { IUnitRepository } from 'src/modules/units/domain/interfaces/repository.interface';
import { TransactionType } from 'src/shared/enums/transaction-type.enum';
import { ConsortiumNotExistsException } from 'src/shared/exceptions/consortium-not-exists.exception';
import { ITransactionRepository } from 'src/shared/interfaces/transaction.interface';
import { Period } from 'src/shared/types/period.type';
import { UnitProration } from 'src/shared/types/unit-proration.type';
import { ISettlementRepository } from '../../domain/interfaces/repository.interface';
import { TransactionSnapshot } from '../../domain/types/transaction-snapshot.type';
import { PreviewSettlementInputDto } from '../dto/preview.dto';
import { SettlementOutputDto } from '../dto/settlement.dto';
import { ClosedSettlementException } from '../exceptions/closed-settlement.exception';
import { Money } from 'src/shared/value-objects/money.vo';

export class PreviewSettlementUseCase {
  constructor(
    private readonly settlementRepository: ISettlementRepository,
    private readonly consortiumRepository: IConsortiumRepository,
    private readonly unitRepository: IUnitRepository,
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async execute(
    inputDto: PreviewSettlementInputDto,
  ): Promise<SettlementOutputDto> {
    const consortium = await this.consortiumRepository.findById(
      inputDto.consortiumId,
    );
    if (!consortium) {
      throw new ConsortiumNotExistsException(inputDto.consortiumId);
    }

    const isSettlementExists = await this.settlementRepository.findByPeriod(
      inputDto.consortiumId,
      inputDto.period,
    );
    if (isSettlementExists || this.isPeriodClosed(inputDto.period)) {
      throw new ClosedSettlementException(inputDto.period);
    }

    const transactions = await this.transactionRepository.listByPeriod(
      inputDto.period,
      inputDto.consortiumId,
    );

    const transactionsSnapshot: TransactionSnapshot[] = transactions.map(
      (t) => ({
        id: t.id,
        consortiumId: t.consortiumId,
        unitId: t.unitId,
        type: t.type,
        source: t.source,
        description: t.description,
        amount: t.amount,
        period: t.period,
        createdAt: t.createdAt,
      }),
    );

    const previousPeriod = this.getPreviousPeriod(inputDto.period);
    const previousSettlement = await this.settlementRepository.findByPeriod(
      inputDto.consortiumId,
      previousPeriod,
    );

    const initialCash = previousSettlement
      ? previousSettlement.finalCash
      : Money.zero();

    const { totalExpenses, totalIncomes } =
      this.calculateTotals(transactionsSnapshot);

    const unitsProration = await this.calculateUnitsProration(
      inputDto.consortiumId,
      totalExpenses,
    );

    const finalCash = initialCash.add(totalIncomes).subtract(totalExpenses);

    return {
      transactions: transactionsSnapshot,
      proration: unitsProration,
      initialCash: initialCash.amount,
      expenses: totalExpenses.amount,
      incomes: totalIncomes.amount,
      finalCash: finalCash.amount,
      period: inputDto.period,
    };
  }

  private isPeriodClosed(period: Period): boolean {
    const currentDate = new Date();
    const periodDate = new Date(period);
    return (
      currentDate.getMonth() > periodDate.getMonth() &&
      currentDate.getFullYear() === periodDate.getFullYear()
    );
  }

  private getPreviousPeriod(currentPeriod: Period): Period {
    const previousPeriod = new Date(currentPeriod);
    previousPeriod.setMonth(previousPeriod.getMonth() - 1);
    return previousPeriod.toISOString().substring(0, 7) as Period;
  }

  private calculateTotals(transactions: TransactionSnapshot[]): {
    totalExpenses: Money;
    totalIncomes: Money;
  } {
    let totalExpenses = Money.zero();
    let totalIncomes = Money.zero();

    for (const t of transactions) {
      const m = t.amount.abs();
      if (t.type === TransactionType.Expense) {
        totalExpenses = totalExpenses.add(m);
      }
      if (t.type === TransactionType.Income) {
        totalIncomes = totalIncomes.add(m);
      }
    }
    return { totalExpenses, totalIncomes };
  }

  private async calculateUnitsProration(
    consortiumId: string,
    totalExpenses: Money,
  ): Promise<Array<UnitProration>> {
    const units = await this.unitRepository.listByConsortiumId(consortiumId);
    return units.map((u) => ({
      unitId: u.id,
      responsibleParty: u.responsibleParty ?? null,
      floor: u.floor,
      division: u.division,
      percentage: u.percentage,
      amount: totalExpenses.multiply(u.percentage / 100),
    }));
  }
}
