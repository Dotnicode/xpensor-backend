import { TransactionSource } from 'src/shared/enums/transaction-source.enum';
import { TransactionType } from 'src/shared/enums/transaction-type.enum';
import { Money } from 'src/shared/value-objects/money.vo';
import { PeriodString } from 'src/shared/value-objects/period.vo';

export type TransactionSnapshot = {
  id: string;
  consortiumId: string;
  unitId: string | null;
  type: TransactionType;
  source: TransactionSource;
  description: string;
  amount: Money;
  period: PeriodString;
};
