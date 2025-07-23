import { EntitySchema } from 'typeorm';

export interface ConsortiumOrmEntity {
  id: string;
  name: string;
  taxId: string;
  address: string;
  administratorId: string;
}

export const ConsortiumTypeOrmSchema = new EntitySchema<ConsortiumOrmEntity>({
  name: 'Consortium',
  tableName: 'consortiums',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    name: {
      type: 'varchar',
    },
    taxId: {
      type: 'varchar',
    },
    address: {
      type: 'varchar',
    },
    administratorId: {
      type: 'uuid',
    },
  },
  relations: {
    administratorId: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: {
        name: 'administratorId',
        referencedColumnName: 'id',
      },
      eager: false,
    },
  },
});
