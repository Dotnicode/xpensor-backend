import { ExpenseType } from '../../domain/enums/expense-type.enum';

export class CreateExpenseInputDto {
  consortiumId: string;
  description: string;
  type: ExpenseType;
  category: string;
  amount: number;
  date: Date;
  isProrated: boolean;
}
