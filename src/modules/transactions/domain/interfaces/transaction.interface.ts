import { Money } from 'src/shared/value-objects/money.vo';
import { PeriodString } from 'src/shared/value-objects/period.vo';
import { TransactionSource } from '../enums/transaction-source.enum';
import { TransactionType } from '../enums/transaction-type.enum';

export interface ITransaction {
  id: string;
  consortiumId: string;
  unitId: string | null;
  type: TransactionType;
  source: TransactionSource;
  description: string;
  amount: Money;
  period: PeriodString;
  createdAt: Date;
}
