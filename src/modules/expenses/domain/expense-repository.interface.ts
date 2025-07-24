import { ExpenseEntity } from './expense.entity';

export interface IExpenseRepository {
  create(expense: ExpenseEntity): Promise<void>;
  findByMonth(date: Date, consortiumId: string): Promise<ExpenseEntity[]>;
}
