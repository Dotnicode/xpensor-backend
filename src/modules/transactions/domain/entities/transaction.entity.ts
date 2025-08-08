import { TransactionSource } from '../enums/transaction-source.enum';
import { TransactionType } from '../enums/transaction-type.enum';
import { ITransaction } from '../interfaces/transaction.interface';
import { Period } from '../types/period.type';

export class Transaction implements ITransaction {
  constructor(
    public readonly id: string,
    public readonly consortiumId: string,
    public readonly unitId: string | null,
    public readonly type: TransactionType,
    public readonly source: TransactionSource,
    public readonly description: string,
    public readonly amount: number,
    public readonly period: Period,
    public readonly createdAt: Date,
  ) {}
}
