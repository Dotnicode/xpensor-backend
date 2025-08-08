import { UnitProration } from 'src/shared/types/unit-proration.type';
import { Period } from 'src/shared/types/period.type';
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
    period: Period,
  ): Promise<Settlement>;

  findByPeriod(
    consortiumId: string,
    period: Period,
  ): Promise<Settlement | null>;

  findById(settlementId: string): Promise<Settlement | null>;

  listByConsortiumId(consortiumId: string): Promise<Settlement[]>;
}
