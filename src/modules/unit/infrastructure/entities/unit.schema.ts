import { EntitySchema } from 'typeorm';

export interface UnitOrmEntity {
  id: string;
  floor: string;
  label: string;
  percentage: number;
  consortiumId: string;
}

export const UnitOrmSchema = new EntitySchema<UnitOrmEntity>({
  name: 'Unit',
  tableName: 'units',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    floor: {
      type: 'int',
    },
    label: {
      type: 'varchar',
    },
    percentage: {
      type: 'float',
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
