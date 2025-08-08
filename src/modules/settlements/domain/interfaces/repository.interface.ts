import { UnitProration } from 'src/shared/types/unit-proration.type';
import { Period } from 'src/shared/types/period.type';
import { Settlement } from '../entities/settlement.entity';

export interface ISettlementRepository {
  create(
    consortiumId: string,
    period: Period,
    expenses: string[],
    summary: UnitProration[],
    total: number,
  ): Promise<Settlement>;

  findByPeriod(
    consortiumId: string,
    period: Period,
  ): Promise<Settlement | null>;

  findById(settlementId: string): Promise<Settlement | null>;

  list(consortiumId: string): Promise<Settlement[]>;
}
