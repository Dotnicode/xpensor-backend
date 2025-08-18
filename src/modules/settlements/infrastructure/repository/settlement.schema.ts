import { UnitProration } from 'src/shared/types/unit-proration.type';
import { PeriodString } from 'src/shared/value-objects/period.vo';
import { EntitySchema } from 'typeorm';
import { TransactionSnapshot } from '../../domain/types/transaction-snapshot.type';

export interface SettlementOrmEntity {
  id: string;
  consortiumId: string;
  transactions: TransactionSnapshot[];
  proration: UnitProration[];
  initialCash_cents: number;
  incomes_cents: number;
  expenses_cents: number;
  finalCash_cents: number;
  period: PeriodString;
  createdAt: Date;
}

export const SettlementOrmSchema = new EntitySchema<SettlementOrmEntity>({
  name: 'Settlement',
  tableName: 'settlements',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    consortiumId: {
      type: 'uuid',
    },
    transactions: {
      type: 'jsonb',
    },
    proration: {
      type: 'jsonb',
    },
    initialCash_cents: {
      type: 'int',
    },
    incomes_cents: {
      type: 'int',
    },
    expenses_cents: {
      type: 'int',
    },
    finalCash_cents: {
      type: 'int',
    },
    period: {
      type: 'varchar',
      length: '7',
    },
    createdAt: {
      name: 'created_at',
      type: 'timestamp',
      createDate: true,
    },
  },
  uniques: [{ name: 'UQ_settlement_consortium_period', columns: ['consortiumId', 'period'] }],
  indices: [
    {
      name: 'IDX_settlement_consortium_period',
      columns: ['consortiumId', 'period'],
      unique: false,
    },
  ],
});
