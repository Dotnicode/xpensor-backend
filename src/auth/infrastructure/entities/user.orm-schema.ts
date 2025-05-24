import { EntitySchema } from 'typeorm';

export interface UserOrmEntity {
  id: string;
  email: string;
  password: string;
}

export const UserOrmSchema = new EntitySchema<UserOrmEntity>({
  name: 'user',
  tableName: 'users',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    email: {
      type: 'varchar',
      unique: true,
    },
    password: {
      type: 'varchar',
    },
  },
});
