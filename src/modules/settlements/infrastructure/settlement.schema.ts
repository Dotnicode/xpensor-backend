import { EntitySchema } from 'typeorm';

export interface SettlementOrmEntity {
  id: string;
  consortiumId: string;
  amount: number;
  period: string;
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
    amount: {
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
