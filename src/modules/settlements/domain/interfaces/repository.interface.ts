import { UnitProration } from 'src/shared/types/unit-proration.type';
import { PeriodString } from 'src/shared/value-objects/period.vo';
import { Settlement } from '../entities/settlement.entity';
import { TransactionSnapshot } from '../types/transaction-snapshot.type';

export interface ISettlementRepository {
  create(
    consortiumId: string,
    transactions: TransactionSnapshot[],
    proration: UnitProration[],
    initialCash: number,
    incomes: number,
    expenses: number,
    finalCash: number,
    period: PeriodString,
  ): Promise<Settlement>;

  findByPeriod(consortiumId: string, period: PeriodString): Promise<Settlement | null>;

  findById(settlementId: string): Promise<Settlement | null>;

  listByConsortiumId(consortiumId: string): Promise<Settlement[]>;
}
