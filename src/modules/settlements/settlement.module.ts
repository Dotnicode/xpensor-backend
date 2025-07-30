import { Module } from '@nestjs/common';
import { ConsortiumModule } from '../consortium/consortium.module';
import { ConsortiumRepository } from '../consortium/infrastructure/consortium.repository';
import { ExpenseRepository } from '../expenses/infrastructure/expense.repository';
import { CalculateSettlementUseCase } from './application/calculate.usecase';
import { SettlementRepository } from './infrastructure/settlement.repository';
import { SettlementController } from './presentation/settlement.controller';

@Module({
  imports: [ConsortiumModule],
  controllers: [SettlementController],
  providers: [
    SettlementRepository,
    ConsortiumRepository,
    ExpenseRepository,
    {
      provide: CalculateSettlementUseCase,
      useFactory: (
        settlementRepository: SettlementRepository,
        consortiumRepository: ConsortiumRepository,
        expenseRepository: ExpenseRepository,
      ) => {
        return new CalculateSettlementUseCase(
          settlementRepository,
          consortiumRepository,
          expenseRepository,
        );
      },
      inject: [SettlementRepository, ConsortiumRepository, ExpenseRepository],
    },
  ],
})
export class SettlementModule {}
