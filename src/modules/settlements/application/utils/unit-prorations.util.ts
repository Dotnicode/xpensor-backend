import { IExpense } from 'src/shared/interfaces/expense.interface';

export function sumProratedExpenses(expenses: IExpense[]) {
  const totalProrated = expenses
    .filter((expense) => expense.isProrated)
    .reduce((acc, expense) => acc + expense.amount, 0);

  return totalProrated;
}
