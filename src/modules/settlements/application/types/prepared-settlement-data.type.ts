import { Period } from 'src/shared/value-objects/period.vo';
import { UnitProration } from '../../domain/types/unit-proration.type';
import { TransactionSnapshot } from '../../domain/types/transaction-snapshot.type';
import { Money } from 'src/shared/value-objects/money.vo';

export type PreparedSettlementData = {
  currentPeriod: Period;
  isSettlementExists: boolean;
  transactionsSnapshot: TransactionSnapshot[];
  unitsProration: UnitProration[];
  initialCash: Money;
  totalIncomes: Money;
  totalExpenses: Money;
  finalCash: Money;
};