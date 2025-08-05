import { ISettlement } from 'src/shared/interfaces/settlement.interface';
import { UnitProration } from 'src/shared/types/unit-proration.type';
import { YearMonth } from 'src/shared/types/year-month.type';

export class SettlementEntity implements ISettlement {
  constructor(
    public readonly id: string,
    public readonly consortiumId: string,
    public readonly transactions: string[],
    public readonly proration: UnitProration[],
    public readonly initialCash: number,
    public readonly incomes: number,
    public readonly expenses: number,
    public readonly finalCash: number,
    public readonly period: YearMonth,
    public readonly createdAt: Date,
  ) {}
}
