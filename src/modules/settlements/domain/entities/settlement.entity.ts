import { Money } from 'src/shared/value-objects/money.vo';
import { PeriodString } from 'src/shared/value-objects/period.vo';
import { ISettlement } from '../interfaces/settlement.interface';
import { TransactionSnapshot } from '../types/transaction-snapshot.type';
import { UnitProration } from '../types/unit-proration.type';

export class Settlement implements ISettlement {
  constructor(
    public readonly id: string,
    public readonly consortiumId: string,
    public readonly transactions: TransactionSnapshot[],
    public readonly proration: UnitProration[],
    public readonly initialCash: Money,
    public readonly incomes: Money,
    public readonly expenses: Money,
    public readonly finalCash: Money,
    public readonly period: PeriodString,
    public readonly createdAt: Date,
  ) {}
}
