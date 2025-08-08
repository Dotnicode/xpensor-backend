export function sumProratedExpenses(expenses: any[]) {
  const totalProrated = expenses
    .filter((expense) => expense.isProrated)
    .reduce((acc, expense) => acc + expense.amount, 0);

  return totalProrated;
}
