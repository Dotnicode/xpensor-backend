import { ResponsiblePartySnapshot } from 'src/shared/interfaces/responsible-party-snapshot.interface';
import { Money } from 'src/shared/value-objects/money.vo';

export type UnitProration = {
  unitId: string;
  responsibleParty: ResponsiblePartySnapshot | null;
  floor: string;
  division: string;
  percentage: number;
  amount: Money;
};
