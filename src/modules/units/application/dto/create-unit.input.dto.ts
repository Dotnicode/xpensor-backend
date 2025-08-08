import { IUnit } from 'src/shared/interfaces/unit.interface';
import { ResponsiblePartySnapshot } from '../../domain/interfaces/responsible-party-snapshot.type';

export interface CreateUnitInputDto extends Partial<IUnit> {
  consortiumId: string;
  floor: string;
  division: string;
  percentage: number;
  responsibleParty?: ResponsiblePartySnapshot;
}
