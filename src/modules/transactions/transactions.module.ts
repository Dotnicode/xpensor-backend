import { Module } from '@nestjs/common';
import { TransactionRepositoryMapper } from './infrastructure/repository/transaction.mapper';
import { TransactionRepository } from './infrastructure/repository/transaction.repository';
import { TransactionController } from './presentation/transaction.controller';
import { CreateTransactionUseCase } from './application/use-cases/create-transaction.usecase';
import { ITransactionRepository } from './domain/interfaces/repository.interface';
import { IUnitRepository } from '../units/domain/interfaces/repository.interface';
import { ConsortiumRepository } from '../consortiums/infrastructure/consortium.repository';
import { UnitRepository } from '../units/infrastructure/unit.repository';
import { UnitModule } from '../units/unit.module';
import { ConsortiumModule } from '../consortiums/consortium.module';
import { ListTransactionsByPeriodUseCase } from './application/use-cases/list-by-period.usecase';
import { IConsortiumRepository } from '../consortiums/domain/interfaces/repository.interface';

@Module({
  imports: [UnitModule, ConsortiumModule],
  controllers: [TransactionController],
  providers: [
    TransactionRepository,
    TransactionRepositoryMapper,
    {
      provide: CreateTransactionUseCase,
      useFactory: (
        consortiumRepository: IConsortiumRepository,
        unitRepository: IUnitRepository,
        transactionRepository: ITransactionRepository,
      ) => {
        return new CreateTransactionUseCase(
          consortiumRepository,
          unitRepository,
          transactionRepository,
        );
      },
      inject: [ConsortiumRepository, UnitRepository, TransactionRepository],
    },
    {
      provide: ListTransactionsByPeriodUseCase,
      useFactory: (transactionRepository: ITransactionRepository) => {
        return new ListTransactionsByPeriodUseCase(transactionRepository);
      },
      inject: [TransactionRepository],
    },
  ],
  exports: [TransactionRepository],
})
export class TransactionsModule {}
