import { BaseUseCase } from 'src/shared/interfaces/base-usecase.interface';
import { IUnit } from 'src/shared/interfaces/unit.interface';
import { IUnitRepository } from '../../domain/interfaces/repository.interface';

export class FindUnitByIdUseCase implements BaseUseCase {
  constructor(private readonly unitRepository: IUnitRepository) {}

  async execute(id: string): Promise<IUnit | null> {
    return await this.unitRepository.findById(id);
  }
}
