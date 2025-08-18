import { TransactionSource } from 'src/shared/enums/transaction-source.enum';
import { TransactionType } from 'src/shared/enums/transaction-type.enum';
import { PeriodString } from 'src/shared/value-objects/period.vo';

export class TransactionSnapshotOutputDto {
  id: string;
  consortiumId: string;
  unitId: string | null;
  type: TransactionType;
  source: TransactionSource;
  description: string;
  amount: number;
  period: PeriodString;
}
