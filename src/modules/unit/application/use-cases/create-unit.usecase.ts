import { v4 as uuidv4 } from 'uuid';

import { IUnitRepository } from '../../domain/unit-repository.interface';
import { UnitEntity } from '../../domain/unit.entity';
import { CreateUnitInputDto } from '../dto/create-unit.input.dto';
import { UnitExistsException } from '../../domain/exceptions/unit-exists.exception';

export class CreateUnitUseCase {
  constructor(private readonly unitRepository: IUnitRepository) {}

  async execute(inputDto: CreateUnitInputDto): Promise<void> {
    try {
      const newUnit = new UnitEntity(
        uuidv4(),
        inputDto.floor,
        inputDto.apartment,
        inputDto.percentage,
        inputDto.consortiumId,
      );

      await this.unitRepository.create(newUnit);
    } catch (error) {
      if (error instanceof UnitExistsException) {
        throw new UnitExistsException({
          floor: inputDto.floor,
          apartment: inputDto.apartment,
        });
      }
      throw error;
    }
  }
}
