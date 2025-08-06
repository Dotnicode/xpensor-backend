import { UnitProration } from 'src/shared/types/unit-proration.type';
import { Period } from 'src/shared/types/period.type';
import { SettlementEntity } from '../settlement.entity';

export interface ISettlementRepository {
  create(
    consortiumId: string,
    period: Period,
    expenses: string[],
    summary: UnitProration[],
    total: number,
  ): Promise<SettlementEntity>;

  findByPeriod(
    consortiumId: string,
    period: Period,
  ): Promise<SettlementEntity | null>;

  findById(settlementId: string): Promise<SettlementEntity | null>;

  list(consortiumId: string): Promise<SettlementEntity[]>;
}
