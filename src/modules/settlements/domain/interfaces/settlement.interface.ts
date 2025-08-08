import { Period } from 'src/shared/types/period.type';
import { TransactionSnapshot } from '../types/transaction-snapshot.type';
import { UnitProration } from '../types/unit-proration.type';

export interface ISettlement {
  id: string;
  consortiumId: string;
  transactions: TransactionSnapshot[];
  proration: UnitProration[];
  initialCash: number;
  incomes: number;
  expenses: number;
  finalCash: number;
  period: Period;
  createdAt: Date;
}
