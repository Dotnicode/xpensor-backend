import { UnitEntity } from '../domain/unit.entity';
import { UnitRepository } from '../infrastructure/unit.repository';

export class ListUnitsByConsortiumIdUseCase {
  constructor(private readonly unitRepository: UnitRepository) {}

  async execute(consortiumId: string): Promise<UnitEntity[]> {
    const units = await this.unitRepository.findAllByConsortiumId(consortiumId);
    return units;
  }
}
