import { Module } from '@nestjs/common';
import { TransactionRepositoryMapper } from './infrastructure/repository/transaction.mapper';
import { TransactionRepository } from './infrastructure/repository/transaction.repository';
import { TransactionController } from './presentation/transaction.controller';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [TransactionRepository, TransactionRepositoryMapper],
  exports: [],
})
export class TransactionsModule {}
