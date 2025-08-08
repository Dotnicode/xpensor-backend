import { UnitProration } from 'src/shared/types/unit-proration.type';
import { EntitySchema } from 'typeorm';
import { TransactionSnapshot } from '../../domain/types/transaction-snapshot.type';
import { Period } from 'src/shared/types/period.type';

export interface SettlementOrmEntity {
  id: string;
  consortiumId: string;
  transactions: TransactionSnapshot[];
  proration: UnitProration[];
  initialCash: number;
  incomes: number;
  expenses: number;
  finalCash: number;
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
    initialCash: {
      type: 'float',
    },
    incomes: {
      type: 'float',
    },
    expenses: {
      type: 'float',
    },
    finalCash: {
      type: 'float',
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
