import { IConsortiumRepository } from 'src/modules/consortium/domain/consortium-repository.interface';
import { IExpenseRepository } from '../domain/expense-repository.interface';
import { ExpenseEntity } from '../domain/expense.entity';
import { CreateExpenseInputDto } from './dto/create-expense-input.dto';
import { randomUUID } from 'crypto';
import { ConsortiumNotExistsException } from '../domain/exceptions/consortium-not-exists.exception';

export class CreateExpenseUseCase {
  constructor(
    private readonly expenseRepository: IExpenseRepository,
    private readonly consortiumRepository: IConsortiumRepository,
  ) {}

  async execute(expense: CreateExpenseInputDto) {
    const consortium = await this.consortiumRepository.findById(
      expense.consortiumId,
    );
    if (!consortium) {
      throw new ConsortiumNotExistsException(expense.consortiumId);
    }

    const newExpense = new ExpenseEntity(
      randomUUID(),
      expense?.description,
      expense.amount,
      expense.date,
      expense.category,
      consortium.id,
    );

    await this.expenseRepository.create(newExpense);
  }
}
