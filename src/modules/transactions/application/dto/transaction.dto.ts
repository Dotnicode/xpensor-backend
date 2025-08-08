import { TransactionSource } from 'src/shared/enums/transaction-source.enum';
import { TransactionType } from 'src/shared/enums/transaction-type.enum';
import { Period } from 'src/shared/types/period.type';

export class TransactionInputDto {
  consortiumId: string;
  unitId?: string;
  amount: number;
  type: TransactionType;
  source: TransactionSource;
  description: string;
  period: Period;
}

export class TransactionOutputDto {
  id: string;
  consortiumId: string;
  unitId: string | null;
  amount: number;
  type: TransactionType;
  source: TransactionSource;
  description: string;
  period: Period;
  createdAt: Date;
}
