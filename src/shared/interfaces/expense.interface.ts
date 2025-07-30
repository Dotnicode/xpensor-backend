import { ExpenseType } from '../types/expense.type';

export interface IExpense {
  id: string;
  consortiumId: string;
  description: string;
  amount: number;
  date: Date;
  category: string;
  type: ExpenseType;
  isProrated: boolean;
}
