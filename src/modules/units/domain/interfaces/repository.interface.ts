import { IUnit } from './unit.interface';

export interface IUnitRepository {
  create(unit: IUnit): Promise<void>;
  listByConsortiumId(consortiumId: string): Promise<IUnit[]>;
}
