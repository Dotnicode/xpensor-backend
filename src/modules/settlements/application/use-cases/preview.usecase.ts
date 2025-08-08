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
import { prorateWithRounding } from '../utils/unit-prorations.util';

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
    // if (isSettlementExists || this.isPeriodClosed(inputDto.period)) {
    if (isSettlementExists) {
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
      transactions: transactionsSnapshot.map((t) => ({
        ...t,
        amount: t.amount.amount,
      })),
      proration: unitsProration.map((u) => ({
        ...u,
        amount: u.amount.amount,
      })),
      initialCash: initialCash.amount,
      expenses: totalExpenses.amount,
      incomes: totalIncomes.amount,
      finalCash: finalCash.amount,
      period: inputDto.period,
    };
  }

  private isPeriodClosed(period: Period): boolean {
    const [py, pm] = period.split('-').map(Number);
    const now = new Date();
    const cy = now.getFullYear();
    const cm = now.getMonth() + 1;

    return cy > py || (cy === py && cm > pm);
  }

  private getPreviousPeriod(currentPeriod: Period): Period {
    const [year, month] = currentPeriod.split('-').map(Number);
    let prevYear = year;
    let prevMonth = month - 1;

    if (prevMonth === 0) {
      prevMonth = 12;
      prevYear = year - 1;
    }

    return `${prevYear}-${String(prevMonth).padStart(2, '0')}` as Period;
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

    return prorateWithRounding(
      units.map((u) => ({ unitId: u.id, percentage: u.percentage })),
      totalExpenses,
    ).map((u) => ({
      unitId: u.unitId,
      responsibleParty:
        units.find((orig) => orig.id === u.unitId)?.responsibleParty ?? null,
      floor: units.find((orig) => orig.id === u.unitId)!.floor,
      division: units.find((orig) => orig.id === u.unitId)!.division,
      percentage: u.percentage,
      amount: u.amount, // sigue siendo Money
    }));
  }
}
