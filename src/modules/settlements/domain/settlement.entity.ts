import { ISettlement } from 'src/shared/interfaces/settlement.interface';
import { UnitProration } from './types/unit-proration.type';
import { Period } from 'src/shared/types/period.type';

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
    public readonly period: Period,
    public readonly createdAt: Date,
  ) {}
}
