import { IConsortiumRepository } from 'src/modules/consortiums/domain/interfaces/repository.interface';
import { IUnitRepository } from 'src/modules/units/domain/interfaces/repository.interface';
import { ConsortiumNotExistsException } from 'src/shared/exceptions/consortium-not-exists.exception';
import { ITransactionRepository } from 'src/shared/interfaces/transaction.interface';
import { Money } from 'src/shared/value-objects/money.vo';
import { Period, PeriodString } from 'src/shared/value-objects/period.vo';
import { ISettlementRepository } from '../../domain/interfaces/repository.interface';
import { TransactionSnapshot } from '../../domain/types/transaction-snapshot.type';
import { PreparedSettlementData } from '../types/prepared-settlement-data.type';
import { calculateTransactionTotalsByType } from '../utils/calculate-transactions-totals.util';
import { calculateUnitsProration } from '../utils/calculate-units-proration.util';

export class PrepareSettlementService {
  constructor(
    private readonly settlementRepository: ISettlementRepository,
    private readonly consortiumRepository: IConsortiumRepository,
    private readonly unitRepository: IUnitRepository,
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async prepare(consortiumId: string, period: PeriodString): Promise<PreparedSettlementData> {
    const currentPeriod = Period.fromString(period);

    const consortium = await this.consortiumRepository.findById(consortiumId);
    if (!consortium) {
      throw new ConsortiumNotExistsException(consortiumId);
    }

    const isSettlementExists = !!(await this.settlementRepository.findByPeriod(
      consortiumId,
      period,
    ));

    const transactions = await this.transactionRepository.listByPeriod(period, consortiumId);

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
      consortiumId,
      previousPeriod,
    );

    const initialCash = previousSettlement ? previousSettlement.finalCash : Money.zero();
    const { totalExpenses, totalIncomes } = calculateTransactionTotalsByType(transactionsSnapshot);

    const units = await this.unitRepository.listByConsortiumId(consortiumId);
    const unitsProration = calculateUnitsProration(units, totalExpenses);

    const finalCash = initialCash.add(totalIncomes).subtract(totalExpenses);

    console.debug(`Settlement preparation for ${consortiumId}/${period}`);

    return {
      currentPeriod,
      isSettlementExists,
      transactionsSnapshot,
      unitsProration,
      initialCash,
      totalIncomes,
      totalExpenses,
      finalCash,
    };
  }
}
