import { EntitySchema } from 'typeorm';

export interface ExpenseOrmEntity {
  id: string;
  description: string;
  amount: number;
  date: Date;
  category: string;
  consortiumId: string;
}

export const ExpenseOrmSchema = new EntitySchema<ExpenseOrmEntity>({
  name: 'Expense',
  tableName: 'expenses',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    amount: {
      type: 'float',
    },
    description: {
      type: 'varchar',
      nullable: true,
    },
    date: {
      type: 'date',
    },
    category: {
      type: 'varchar',
      nullable: true,
    },
    consortiumId: {
      type: 'uuid',
    },
  },
  relations: {
    consortiumId: {
      type: 'many-to-one',
      target: 'Consortium',
      joinColumn: {
        name: 'consortiumId',
        referencedColumnName: 'id',
      },
      eager: false,
    },
  },
});
