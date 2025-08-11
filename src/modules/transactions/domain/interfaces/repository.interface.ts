import { PeriodString } from 'src/shared/value-objects/period.vo';
import { ITransaction } from './transaction.interface';

export interface ITransactionRepository {
  create(transaction: ITransaction): Promise<void>;

  listByPeriod(period: PeriodString, consortiumId: string): Promise<ITransaction[]>;
}
