import { ISettlement } from 'src/shared/interfaces/settlement.interface';
import { UnitProration } from 'src/shared/types/unit-proration.type';
import { YearMonth } from 'src/shared/types/year-month.type';

export class SettlementEntity implements ISettlement {
  constructor(
    public readonly id: string,
    public readonly consortiumId: string,
    public readonly period: YearMonth,
    public readonly expenses: string[],
    public readonly summary: UnitProration[],
    public readonly total: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
