import { IConsortiumRepository } from '../../domain/consortium-repository.interface';
import { Consortium } from '../../domain/consortium.entity';
import { UpdateConsortiumInputDto } from '../dto/update-consortium.input.dto';
import { ConsortiumNotExistsException } from '../exceptions/consortium-not-exists.exception';

export class UpdateConsortiumUseCase {
  constructor(private readonly consortiumRepository: IConsortiumRepository) {}

  async execute(
    id: string,
    updateConsortiumInputDto: UpdateConsortiumInputDto,
    userId: string,
  ): Promise<void> {
    const existingConsortium = await this.consortiumRepository.findById(id);

    if (!existingConsortium) {
      throw new ConsortiumNotExistsException(id);
    }

    existingConsortium.isAdministrator(userId);

    const updatedConsortium = new Consortium(
      id,
      updateConsortiumInputDto.name ?? existingConsortium.name,
      updateConsortiumInputDto.taxId ?? existingConsortium.taxId,
      updateConsortiumInputDto.address ?? existingConsortium.address,
      existingConsortium.userId,
    );

    await this.consortiumRepository.update(updatedConsortium);
  }
}
