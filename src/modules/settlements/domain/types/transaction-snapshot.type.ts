import { TransactionSource } from 'src/shared/enums/transaction-source.enum';
import { TransactionType } from 'src/shared/enums/transaction-type.enum';
import { Period } from 'src/shared/types/period.type';

export type TransactionSnapshot = {
  id: string;
  consortiumId: string;
  unitId: string | null;
  type: TransactionType;
  source: TransactionSource;
  description: string;
  /**
   * Positive (+) Income, Negative (-) Expense
   */
  amount: number;
  period: Period;
};
