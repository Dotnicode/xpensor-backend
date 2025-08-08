import { EntitySchema } from 'typeorm';
import { ResponsiblePartySnapshot } from '../domain/interfaces/responsible-party-snapshot.type';

export interface UnitOrmEntity {
  id: string;
  consortiumId: string;
  floor: string;
  division: string;
  percentage: number;
  responsibleParty?: ResponsiblePartySnapshot | null;
}

export const UnitOrmSchema = new EntitySchema<UnitOrmEntity>({
  name: 'Unit',
  tableName: 'units',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    consortiumId: {
      type: 'uuid',
    },
    responsibleParty: {
      type: 'jsonb',
      nullable: true,
    },
    floor: {
      type: 'varchar',
    },
    division: {
      type: 'varchar',
    },
    percentage: {
      type: 'float',
    },
  },
  indices: [
    {
      name: 'unique_unit_per_consortium',
      unique: true,
      columns: ['consortiumId', 'floor', 'division'],
    },
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
