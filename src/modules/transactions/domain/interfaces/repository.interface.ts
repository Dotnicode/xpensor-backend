import { Period } from '../types/period.type';
import { ITransaction } from './transaction.interface';

export interface ITransactionRepository {
  create(transaction: ITransaction): Promise<void>;

  listByPeriod(period: Period, consortiumId: string): Promise<ITransaction[]>;
}
