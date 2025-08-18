import { IConsortiumRepository } from 'src/modules/consortiums/domain/interfaces/repository.interface';
import { IUnitRepository } from 'src/modules/units/domain/interfaces/repository.interface';
import { ConsortiumNotExistsException } from 'src/shared/exceptions/consortium-not-exists.exception';
import { ITransactionRepository } from 'src/shared/interfaces/transaction.interface';
import { Money } from 'src/shared/value-objects/money.vo';
import { Period } from 'src/shared/value-objects/period.vo';
import { ISettlementRepository } from '../../domain/interfaces/repository.interface';
import { TransactionSnapshot } from '../../domain/types/transaction-snapshot.type';
import { CloseSettlementPeriodInputDto } from '../dto/close-period.dto';
import { SettlementPeriodClosedException } from '../exceptions/period-closed.exception';
import { calculateTransactionTotalsByType } from '../utils/calculate-transactions-totals.util';
import { calculateUnitsProration } from '../utils/calculate-units-proration.util';

export class CloseSettlementPeriodUseCase {
  constructor(
    private readonly settlementRepository: ISettlementRepository,
    private readonly consortiumRepository: IConsortiumRepository,
    private readonly unitRepository: IUnitRepository,
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async execute(inputDto: CloseSettlementPeriodInputDto): Promise<void> {
    const currentPeriod = Period.fromString(inputDto.period);
    const isCurrentPeriod = currentPeriod.equals(Period.fromDate());

    if (isCurrentPeriod) {
      throw new Error('Cannot close current period');
    }

    const consortium = await this.consortiumRepository.findById(inputDto.consortiumId);
    if (!consortium) {
      throw new ConsortiumNotExistsException(inputDto.consortiumId);
    }

    const isSettlementExists = await this.settlementRepository.findByPeriod(
      inputDto.consortiumId,
      inputDto.period,
    );
    if (isSettlementExists) {
      throw new SettlementPeriodClosedException(inputDto.period);
    }

    const transactions = await this.transactionRepository.listByPeriod(
      inputDto.period,
      inputDto.consortiumId,
    );

    const transactionsSnapshot: TransactionSnapshot[] = transactions.map((t) => ({
      id: t.id,
      consortiumId: t.consortiumId,
      unitId: t.unitId,
      type: t.type,
      source: t.source,
      description: t.description,
      amount: t.amount,
      period: t.period,
      createdAt: t.createdAt,
    }));

    const previousPeriod = currentPeriod.previousPeriod.toString();
    const previousSettlement = await this.settlementRepository.findByPeriod(
      inputDto.consortiumId,
      previousPeriod,
    );

    const initialCash = previousSettlement ? previousSettlement.finalCash : Money.zero();
    const { totalExpenses, totalIncomes } = calculateTransactionTotalsByType(transactionsSnapshot);

    const units = await this.unitRepository.listByConsortiumId(inputDto.consortiumId);
    const unitsProration = calculateUnitsProration(units, totalExpenses);

    const finalCash = initialCash.add(totalIncomes).subtract(totalExpenses);

    await this.settlementRepository.createWithCheck(
      inputDto.consortiumId,
      transactionsSnapshot,
      unitsProration,
      initialCash.amount,
      totalIncomes.amount,
      totalExpenses.amount,
      finalCash.amount,
      inputDto.period,
    );
  }
}
