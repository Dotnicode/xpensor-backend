import { TransactionSource } from '../enums/transaction-source.enum';
import { TransactionType } from '../enums/transaction-type.enum';
import { Period } from '../types/period.type';

export interface ITransaction {
  id: string;
  consortiumId: string;
  unitId: string | null;
  type: TransactionType;
  source: TransactionSource;
  description: string;
  amount: number;
  period: Period;
  createdAt: Date;
}
