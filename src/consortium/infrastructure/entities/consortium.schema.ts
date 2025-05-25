import { EntitySchema } from 'typeorm';

export interface ConsortiumOrmEntity {
  id: string;
  name: string;
  taxId: string;
  address: string;
  ownerId: string;
}

export const ConsortiumOrmSchema = new EntitySchema<ConsortiumOrmEntity>({
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
    ownerId: {
      type: 'uuid',
    },
  },
  relations: {
    ownerId: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: {
        name: 'ownerId',
        referencedColumnName: 'id',
      },
      eager: false,
    },
  },
});
