import { UnitEntity } from './unit.entity';

export interface IUnitRepository {
  create(unit: UnitEntity): Promise<void>;
  findAllByConsortiumId(consortiumId: string): Promise<UnitEntity[]>;
  findOneById(id: string): Promise<UnitEntity | null>;
  update(unit: UnitEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
