import { UnitEntity } from '../../domain/unit.entity';
import { IUnitRepository } from '../../domain/unit-repository.interface';
import { NotFoundException } from '@nestjs/common';
import { CreateUnitDto } from '../dto/create-unit.dto';
import { v4 as uuidv4 } from 'uuid';

export class CreateUnitUseCase {
  constructor(private readonly unitRepository: IUnitRepository) {}

  async execute(
    floor: string,
    label: string,
    percentage: number,
    consortiumId: string,
  ): Promise<void> {
    const newUnit = new UnitEntity(
      uuidv4(),
      floor,
      label,
      percentage,
      consortiumId,
    );

    console.log('newUnit', newUnit);

    await this.unitRepository.create(newUnit);
  }
}
