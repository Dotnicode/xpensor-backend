import { TransactionType } from 'src/shared/enums/transaction-type.enum';
import { Money } from 'src/shared/value-objects/money.vo';
import { TransactionSnapshot } from '../../domain/types/transaction-snapshot.type';

export function calculateTotals(transactions: TransactionSnapshot[]): {
  totalExpenses: Money;
  totalIncomes: Money;
} {
  let totalExpenses = Money.zero();
  let totalIncomes = Money.zero();

  for (const t of transactions) {
    const m = t.amount.abs();
    if (t.type === TransactionType.Expense) {
      totalExpenses = totalExpenses.add(m);
    }
    if (t.type === TransactionType.Income) {
      totalIncomes = totalIncomes.add(m);
    }
  }
  return { totalExpenses, totalIncomes };
}
