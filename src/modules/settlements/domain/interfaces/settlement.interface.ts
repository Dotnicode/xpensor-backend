import { Period } from 'src/shared/types/period.type';
import { Money } from 'src/shared/value-objects/money.vo';
import { TransactionSnapshot } from '../types/transaction-snapshot.type';
import { UnitProration } from '../types/unit-proration.type';

export interface ISettlement {
  id: string;
  consortiumId: string;
  transactions: TransactionSnapshot[];
  proration: UnitProration[];
  initialCash: Money;
  incomes: Money;
  expenses: Money;
  finalCash: Money;
  period: Period;
  createdAt: Date;
}
