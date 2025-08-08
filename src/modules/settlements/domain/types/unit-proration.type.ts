import { ResponsiblePartySnapshot } from 'src/shared/interfaces/responsible-party-snapshot.interface';

export type UnitProration = {
  unitId: string;
  responsibleParty: ResponsiblePartySnapshot | null;
  floor: string;
  division: string;
  percentage: number;
  amount: number;
};
