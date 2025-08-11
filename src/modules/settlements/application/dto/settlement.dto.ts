import { PeriodString } from 'src/shared/value-objects/period.vo';
import { TransactionSnapshotOutputDto } from './transaction-snapshot.dto';
import { UnitProrationOutputDto } from './unit-proration.dto';

export class SettlementOutputDto {
  transactions: TransactionSnapshotOutputDto[];
  proration: UnitProrationOutputDto[];
  initialCash: number;
  incomes: number;
  expenses: number;
  finalCash: number;
  closed: boolean;
  period: PeriodString;
}
