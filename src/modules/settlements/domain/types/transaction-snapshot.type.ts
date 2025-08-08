import { TransactionSource } from 'src/shared/enums/transaction-source.enum';
import { TransactionType } from 'src/shared/enums/transaction-type.enum';
import { Period } from 'src/shared/types/period.type';
import { Money } from 'src/shared/value-objects/money.vo';

export type TransactionSnapshot = {
  id: string;
  consortiumId: string;
  unitId: string | null;
  type: TransactionType;
  source: TransactionSource;
  description: string;
  amount: Money;
  period: Period;
};
