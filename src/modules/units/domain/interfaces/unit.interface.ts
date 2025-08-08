import { ResponsiblePartySnapshot } from './responsible-party-snapshot.type';

export interface IUnit {
  id: string;
  consortiumId: string;
  floor: string;
  division: string;
  percentage: number;
  responsibleParty?: ResponsiblePartySnapshot | null;
}
