import { ResponsiblePartySnapshot } from 'src/shared/interfaces/responsible-party-snapshot.interface';

export class UnitProrationOutputDto {
  unitId: string;
  responsibleParty: ResponsiblePartySnapshot | null;
  floor: string;
  division: string;
  percentage: number;
  amount: number;
}
