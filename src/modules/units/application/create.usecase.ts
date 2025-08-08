import { IConsortiumRepository } from 'src/shared/interfaces/consortium.interface';
import { v4 as uuidv4 } from 'uuid';
import { Unit } from '../domain/entities/unit.entity';
import { ConsortiumNotExistsException } from '../domain/exceptions/consortium-not-exists.exception';
import { UnitExistsException } from '../domain/exceptions/unit-exists.exception';
import { IUnitRepository } from '../domain/interfaces/repository.interface';
import { CreateUnitInputDto } from './dto/create-unit.input.dto';

export class CreateUnitUseCase {
  constructor(
    private readonly unitRepository: IUnitRepository,
    private readonly consortiumRepository: IConsortiumRepository,
  ) {}

  async execute(inputDto: CreateUnitInputDto): Promise<void> {
    try {
      const consortium = await this.consortiumRepository.findById(
        inputDto.consortiumId,
      );
      if (!consortium) {
        throw new ConsortiumNotExistsException(inputDto.consortiumId);
      }

      const newUnit = new Unit(
        uuidv4(),
        inputDto.consortiumId,
        inputDto.floor,
        inputDto.division,
        inputDto.percentage,
        inputDto.responsibleParty ?? null,
      );

      await this.unitRepository.create(newUnit);
    } catch (error) {
      if (error instanceof UnitExistsException) {
        throw new UnitExistsException({
          floor: inputDto.floor,
          division: inputDto.division,
        });
      }
      if (error instanceof ConsortiumNotExistsException) {
        throw new ConsortiumNotExistsException(inputDto.consortiumId);
      }
      throw error;
    }
  }
}
