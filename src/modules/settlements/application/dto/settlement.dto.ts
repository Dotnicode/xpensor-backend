import { Period } from 'src/shared/types/period.type';
import { TransactionSnapshotOutputDto } from './transaction-snapshot.dto';
import { UnitProrationOutputDto } from './unit-proration.dto';

export class SettlementOutputDto {
  transactions: TransactionSnapshotOutputDto[];
  proration: UnitProrationOutputDto[];
  initialCash: number;
  incomes: number;
  expenses: number;
  finalCash: number;
  period: Period;
}
