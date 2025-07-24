import { UnitEntity } from './unit.entity';

export interface IUnitRepository {
  create(unit: UnitEntity): Promise<void>;
  findAllByConsortiumId(consortiumId: string): Promise<UnitEntity[]>;
}
