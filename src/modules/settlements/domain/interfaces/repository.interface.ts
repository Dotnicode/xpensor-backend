import { UnitProration } from 'src/shared/types/unit-proration.type';
import { YearMonth } from 'src/shared/types/year-month.type';
import { SettlementEntity } from '../settlement.entity';

export interface ISettlementRepository {
  create(
    consortiumId: string,
    period: YearMonth,
    expenses: string[],
    summary: UnitProration[],
    total: number,
  ): Promise<SettlementEntity>;

  findByPeriod(
    consortiumId: string,
    period: YearMonth,
  ): Promise<SettlementEntity | null>;

  findById(settlementId: string): Promise<SettlementEntity | null>;

  list(consortiumId: string): Promise<SettlementEntity[]>;
}
