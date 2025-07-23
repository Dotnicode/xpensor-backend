import { v4 as uuidv4 } from 'uuid';

import { IUnitRepository } from '../../domain/unit-repository.interface';
import { UnitEntity } from '../../domain/unit.entity';
import { CreateUnitInputDto } from '../dto/create-unit.input.dto';

export class CreateUnitUseCase {
  constructor(private readonly unitRepository: IUnitRepository) {}

  async execute(inputDto: CreateUnitInputDto): Promise<void> {
    const newUnit = new UnitEntity(
      uuidv4(),
      inputDto.floor,
      inputDto.label,
      inputDto.percentage,
      inputDto.consortiumId,
    );

    await this.unitRepository.create(newUnit);
  }
}
