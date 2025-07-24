import { Module } from '@nestjs/common';
import { ConsortiumModule } from '../consortium/consortium.module';
import { ExpensesController } from './presentation/expenses.controller';
import { ConsortiumRepository } from '../consortium/infrastructure/repositories/consortium.repository';
import { CreateExpenseUseCase } from './application/create-expense.usecase';
import { ExpenseRepository } from './infrastructure/expense.repository';
import { FindExpensesByMonthUseCase } from './application/find-by-month.usecase';

@Module({
  imports: [ConsortiumModule],
  controllers: [ExpensesController],
  providers: [
    ExpenseRepository,
    {
      provide: CreateExpenseUseCase,
      useFactory: (
        expenseRepository: ExpenseRepository,
        consortiumRepository: ConsortiumRepository,
      ) => {
        return new CreateExpenseUseCase(
          expenseRepository,
          consortiumRepository,
        );
      },
      inject: [ExpenseRepository, ConsortiumRepository],
    },
    {
      provide: FindExpensesByMonthUseCase,
      useFactory: (repository: ExpenseRepository) => {
        return new FindExpensesByMonthUseCase(repository);
      },
      inject: [ExpenseRepository],
    },
  ],
})
export class ExpensesModule {}
