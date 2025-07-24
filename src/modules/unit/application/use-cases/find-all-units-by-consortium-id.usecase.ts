import { UnitEntity } from '../../domain/unit.entity';
import { UnitRepository } from '../../infrastructure/repository/unit.repository';

export class FindAllUnitsByConsortiumIdUseCase {
  constructor(private readonly unitRepository: UnitRepository) {}

  async execute(consortiumId: string): Promise<UnitEntity[]> {
    const units = this.unitRepository.findAllByConsortiumId(consortiumId);
    return units;
  }
}
