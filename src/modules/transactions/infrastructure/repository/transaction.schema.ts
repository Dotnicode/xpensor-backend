import { TransactionSource } from 'src/shared/enums/transaction-source.enum';
import { TransactionType } from 'src/shared/enums/transaction-type.enum';
import { Period } from 'src/shared/types/period.type';
import { EntitySchema } from 'typeorm';

export interface TransacionOrmEntity {
  id: string;
  consortiumId: string;
  unitId: string | null;
  type: string;
  source: string;
  description: string;
  amount_cents: number;
  period: Period;
  createdAt: Date;
}

export const TransactionOrmSchema = new EntitySchema<TransacionOrmEntity>({
  name: 'transactions',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    consortiumId: {
      type: 'uuid',
    },
    unitId: {
      type: 'uuid',
      nullable: true,
    },
    type: {
      type: 'enum',
      enum: TransactionType,
    },
    source: {
      type: 'enum',
      enum: TransactionSource,
    },
    description: {
      type: 'varchar',
    },
    amount_cents: {
      type: 'int',
    },
    period: {
      type: 'varchar',
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
  },
  relations: {
    consortiumId: {
      type: 'many-to-one',
      target: 'consortiums',
      joinColumn: {
        name: 'consortiumId',
      },
    },
    unitId: {
      type: 'many-to-one',
      target: 'units',
      joinColumn: {
        name: 'unitId',
      },
    },
  },
});
