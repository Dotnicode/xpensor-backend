import { YearMonth } from 'src/shared/types/year-month.type';
import { SettlementEntity } from './settlement.entity';

export interface ISettlementRepository {
  save(
    consortiumId: string,
    amount: number,
    period: YearMonth,
  ): Promise<SettlementEntity>;
}
