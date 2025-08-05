import { Module } from '@nestjs/common';
import { TransactionController } from './presentation/transaction.controller';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [],
  exports: [],
})
export class TransactionsModule {}
