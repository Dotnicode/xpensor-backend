import { Injectable } from '@nestjs/common';
import { PeriodString } from 'src/shared/value-objects/period.vo';
import { DataSource } from 'typeorm';
import { ITransactionRepository } from '../../domain/interfaces/repository.interface';
import { ITransaction } from '../../domain/interfaces/transaction.interface';
import { TransactionRepositoryMapper } from './transaction.mapper';
import { TransactionOrmSchema } from './transaction.schema';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    private readonly dataSource: DataSource,
    private readonly mapper: TransactionRepositoryMapper,
  ) {}

  async create(transaction: ITransaction): Promise<void> {
    await this.dataSource.getRepository(TransactionOrmSchema).save(this.mapper.toOrm(transaction));
  }

  async listByPeriod(period: PeriodString, consortiumId: string): Promise<ITransaction[]> {
    const transactions = await this.dataSource.getRepository(TransactionOrmSchema).find({
      where: {
        period,
        consortiumId,
      },
    });

    return this.mapper.toDomainArray(transactions);
  }
}
