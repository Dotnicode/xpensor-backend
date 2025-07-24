import { IExpenseRepository } from '../domain/expense-repository.interface';
import { ExpenseEntity } from '../domain/expense.entity';

export class FindExpensesByMonthUseCase {
  constructor(private readonly expenseRepository: IExpenseRepository) {}

  async execute(date: Date, consortiumId: string): Promise<ExpenseEntity[]> {
    if (!date || !consortiumId) {
      throw new Error('Date and consortiumId are required');
    }

    return await this.expenseRepository.findByMonth(date, consortiumId);
  }
}
