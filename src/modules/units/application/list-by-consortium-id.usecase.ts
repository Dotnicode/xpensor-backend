import { IUnit } from '../domain/interfaces/unit.interface';
import { UnitRepository } from '../infrastructure/unit.repository';

export class ListUnitsByConsortiumIdUseCase {
  constructor(private readonly unitRepository: UnitRepository) {}

  async execute(consortiumId: string): Promise<IUnit[]> {
    const units = await this.unitRepository.listByConsortiumId(consortiumId);
    return units;
  }
}
