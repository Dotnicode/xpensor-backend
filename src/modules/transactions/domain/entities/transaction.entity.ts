import { Money } from 'src/shared/value-objects/money.vo';
import { PeriodString } from 'src/shared/value-objects/period.vo';
import { TransactionSource } from '../enums/transaction-source.enum';
import { TransactionType } from '../enums/transaction-type.enum';
import { ITransaction } from '../interfaces/transaction.interface';

export class Transaction implements ITransaction {
  constructor(
    public readonly id: string,
    public readonly consortiumId: string,
    public readonly unitId: string | null,
    public readonly type: TransactionType,
    public readonly source: TransactionSource,
    public readonly description: string,
    public readonly amount: Money,
    public readonly period: PeriodString,
    public readonly createdAt: Date,
  ) {}
}
