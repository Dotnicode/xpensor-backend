import { UnitProration } from 'src/shared/types/unit-proration.type';
import { EntitySchema } from 'typeorm';
import { TransactionSnapshot } from '../../domain/types/transaction-snapshot.type';
import { Period } from 'src/shared/types/period.type';

export interface SettlementOrmEntity {
  id: string;
  consortiumId: string;
  transactions: TransactionSnapshot[];
  proration: UnitProration[];
  initialCash_cents: number;
  incomes_cents: number;
  expenses_cents: number;
  finalCash_cents: number;
  period: Period;
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
      array: true,
    },
    proration: {
      type: 'jsonb',
      nullable: false,
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
});
