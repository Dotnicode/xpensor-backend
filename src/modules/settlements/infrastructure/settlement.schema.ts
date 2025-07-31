import { UnitProration } from 'src/shared/types/unit-proration.type';
import { EntitySchema } from 'typeorm';

export interface SettlementOrmEntity {
  id: string;
  consortiumId: string;
  period: string;
  expenseIds: string[];
  summary: UnitProration[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
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
    period: {
      type: 'varchar',
      length: '7',
    },
    expenseIds: {
      type: 'text',
      array: true,
    },
    summary: {
      type: 'jsonb',
      nullable: false,
    },
    total: {
      type: 'float',
    },
    createdAt: {
      name: 'created_at',
      type: 'timestamp',
      createDate: true,
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamp',
      updateDate: true,
    },
  },
});
