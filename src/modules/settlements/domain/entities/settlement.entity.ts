import { Period } from 'src/shared/types/period.type';
import { ISettlement } from '../interfaces/settlement.interface';
import { TransactionSnapshot } from '../types/transaction-snapshot.type';
import { UnitProration } from '../types/unit-proration.type';

export class Settlement implements ISettlement {
  constructor(
    public readonly id: string,
    public readonly consortiumId: string,
    public readonly transactions: TransactionSnapshot[],
    public readonly proration: UnitProration[],
    public readonly initialCash: number,
    public readonly incomes: number,
    public readonly expenses: number,
    public readonly finalCash: number,
    public readonly period: Period,
    public readonly createdAt: Date,
  ) {}
}
