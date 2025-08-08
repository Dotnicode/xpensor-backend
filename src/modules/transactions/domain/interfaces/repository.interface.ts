import { ITransaction } from './transaction.interface';

export interface ITransactionRepository {
  create(transaction: ITransaction): Promise<void>;

  findByPeriod(
    transactionId: string,
    consortiumId: string,
  ): Promise<ITransaction[]>;
}
