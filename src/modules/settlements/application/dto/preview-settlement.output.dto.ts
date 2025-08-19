import { PeriodString } from 'src/shared/value-objects/period.vo';
import { TransactionSnapshotOutputDto } from './transaction-snapshot.output.dto';
import { UnitProrationOutputDto } from './unit-proration.output.dto';

export class PreviewCurrentSettlementPeriodOutputDto {
  transactions: TransactionSnapshotOutputDto[];
  proration: UnitProrationOutputDto[];
  initialCash: number;
  incomes: number;
  expenses: number;
  finalCash: number;
  period: PeriodString;
}
