import { Injectable } from '@nestjs/common';
import { Period } from 'src/shared/types/period.type';
import { DataSource } from 'typeorm';
import { ITransactionRepository } from '../../domain/interfaces/repository.interface';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionRepositoryMapper } from './transaction.mapper';
import { TransactionOrmSchema } from './transaction.schema';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    private readonly dataSource: DataSource,
    private readonly mapper: TransactionRepositoryMapper,
  ) {}

  async create(transaction: Transaction): Promise<void> {
    await this.dataSource
      .getRepository(TransactionOrmSchema)
      .save(this.mapper.toOrm(transaction));
  }

  async findByPeriod(
    period: Period,
    consortiumId: string,
  ): Promise<Transaction[]> {
    const transactions = await this.dataSource
      .getRepository(TransactionOrmSchema)
      .find({
        where: {
          period,
          consortiumId,
        },
      });

    return this.mapper.toDomainArray(transactions);
  }
}
