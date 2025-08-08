import { Period } from 'src/shared/types/period.type';
import { UnitProration } from 'src/shared/types/unit-proration.type';
import { TransactionSnapshot } from '../../domain/types/transaction-snapshot.type';

export class SettlementOutputDto {
  transactions: TransactionSnapshot[];
  proration: UnitProration[];
  initialCash: number;
  incomes: number;
  expenses: number;
  finalCash: number;
  period: Period;
}
