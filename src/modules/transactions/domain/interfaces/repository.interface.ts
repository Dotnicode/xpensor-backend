import { Transaction } from '../entities/transaction.entity';

export interface ITransactionRepository {
  create(transaction: Transaction): Promise<void>;
  findByPeriod(
    transactionId: string,
    consortiumId: string,
  ): Promise<Transaction[]>;
}
