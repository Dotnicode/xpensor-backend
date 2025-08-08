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
      (transaction) => ({
        id: transaction.id,
        consortiumId: transaction.consortiumId,
        unitId: transaction.unitId,
        type: transaction.type,
        source: transaction.source,
        description: transaction.description,
        amount: transaction.amount,
        period: transaction.period,
        createdAt: transaction.createdAt,
      }),
    );

    const previousPeriod = this.getPreviousPeriod(inputDto.period);
    const previousSettlement = await this.settlementRepository.findByPeriod(
      inputDto.consortiumId,
      previousPeriod,
    );

    let initialCash = 0;
    if (previousSettlement) {
      initialCash = previousSettlement.finalCash;
    }

    const totalExpenses = this.calculateTotalExpenses(transactionsSnapshot);
    const totalIncomes = this.calculateTotalIncomes(transactionsSnapshot);

    const unitsProration: UnitProration[] = await this.unitRepository
      .listByConsortiumId(inputDto.consortiumId)
      .then((units) =>
        units.map((unit) => ({
          unitId: unit.id,
          responsibleParty: unit.responsibleParty ?? null,
          floor: unit.floor,
          division: unit.division,
          percentage: unit.percentage,
          amount: (unit.percentage / 100) * totalExpenses,
        })),
      );

    const finalCash = Number(initialCash + totalIncomes - totalExpenses);

    return {
      transactions: transactionsSnapshot,
      proration: unitsProration,
      initialCash: Number(initialCash),
      expenses: Number(totalExpenses),
      incomes: Number(totalIncomes),
      finalCash: Number(finalCash),
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

  private getNextPeriod(currentPeriod: Period): Period {
    const nextPeriod = new Date(currentPeriod);
    nextPeriod.setMonth(nextPeriod.getMonth() + 1);
    return nextPeriod.toISOString().substring(0, 7) as Period;
  }

  private calculateTotalExpenses(transactions: TransactionSnapshot[]): number {
    return transactions
      .filter((t) => t.type === TransactionType.Expense)
      .reduce((acc, t) => acc + t.amount * -1, 0);
  }

  private calculateTotalIncomes(transactions: TransactionSnapshot[]): number {
    return transactions
      .filter((t) => t.type === TransactionType.Income)
      .reduce((acc, t) => acc + t.amount, 0);
  }
}
