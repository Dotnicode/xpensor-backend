import { IConsortiumRepository } from 'src/modules/consortiums/domain/consortium-repository.interface';
import { v4 as uuidv4 } from 'uuid';
import { ApartmentInvalidError } from '../domain/exceptions/apartment.exception';
import { ConsortiumNotExistsException } from '../domain/exceptions/consortium-not-exists.exception';
import { UnitExistsException } from '../domain/exceptions/unit-exists.exception';
import { IUnitRepository } from '../domain/unit-repository.interface';
import { UnitEntity } from '../domain/unit.entity';
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

      const newUnit = new UnitEntity(
        uuidv4(),
        inputDto.consortiumId,
        inputDto.floor,
        inputDto.apartment,
        inputDto.percentage,
      );

      await this.unitRepository.create(newUnit);
    } catch (error) {
      if (error instanceof UnitExistsException) {
        throw new UnitExistsException({
          floor: inputDto.floor,
          apartment: inputDto.apartment,
        });
      }
      if (error instanceof ConsortiumNotExistsException) {
        throw new ConsortiumNotExistsException(inputDto.consortiumId);
      }
      if (error instanceof ApartmentInvalidError) {
        throw new ApartmentInvalidError(error.message);
      }
      throw error;
    }
  }
}
