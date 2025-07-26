import { EntitySchema } from 'typeorm';
import { ExpenseType } from '../domain/enums/expense-type.enum';

export interface ExpenseOrmEntity {
  id: string;
  consortiumId: string;
  description: string;
  type: ExpenseType;
  category: string;
  amount: number;
  date: Date;
  isProrated: boolean;
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
    consortiumId: {
      type: 'uuid',
    },
    description: {
      type: 'varchar',
    },
    type: {
      type: 'enum',
      enum: ExpenseType,
    },
    category: {
      type: 'varchar',
    },
    amount: {
      type: 'float',
    },
    date: {
      type: 'date',
    },
    isProrated: {
      type: 'boolean',
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
