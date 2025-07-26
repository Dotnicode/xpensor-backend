import { EntitySchema } from 'typeorm';

export interface UnitOrmEntity {
  id: string;
  floor: string;
  apartment: string;
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
    apartment: {
      type: 'varchar',
    },
    percentage: {
      type: 'float',
    },
    consortiumId: {
      type: 'uuid',
    },
  },
  indices: [
    {
      name: 'unique_unit_per_consortium',
      unique: true,
      columns: ['consortiumId', 'floor', 'apartment']
    }
  ],
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
