import { TransactionSource } from 'src/shared/enums/transaction-source.enum';
import { TransactionType } from 'src/shared/enums/transaction-type.enum';
import { ITransaction } from '../../domain/interfaces/transaction.interface';
import { Period } from 'src/shared/types/period.type';

export class TransactionInputDto implements Partial<ITransaction> {
  consortiumId: string;
  unitId?: string;
  amount: number;
  type: TransactionType;
  source: TransactionSource;
  description: string;
  period: Period;
}

export class TransactionOutputDto implements Partial<ITransaction> {
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
