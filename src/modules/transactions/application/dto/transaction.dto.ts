import { TransactionSource } from 'src/shared/enums/transaction-source.enum';
import { TransactionType } from 'src/shared/enums/transaction-type.enum';
import { PeriodString } from 'src/shared/value-objects/period.vo';

export class TransactionInputDto {
  consortiumId: string;
  unitId?: string;
  amount: number;
  type: TransactionType;
  source: TransactionSource;
  description: string;
  period: PeriodString;
}

export class TransactionOutputDto {
  id: string;
  consortiumId: string;
  unitId: string | null;
  amount: number;
  type: TransactionType;
  source: TransactionSource;
  description: string;
  period: PeriodString;
  createdAt: Date;
}
