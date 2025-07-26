import { EntitySchema } from 'typeorm';

export interface ConsortiumOrmEntity {
  id: string;
  name: string;
  taxId: string;
  address: string;
  userId: string;
}

export const ConsortiumOrmSchema = new EntitySchema<ConsortiumOrmEntity>({
  name: 'Consortium',
  tableName: 'consortiums',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    userId: {
      type: 'uuid',
    },
    name: {
      type: 'varchar',
      unique: true,
    },
    address: {
      type: 'varchar',
    },
    taxId: {
      type: 'varchar',
    },
  },
  relations: {
    userId: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: {
        name: 'userId',
        referencedColumnName: 'id',
      },
      eager: false,
    },
  },
});
