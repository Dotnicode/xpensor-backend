import { IConsortiumRepository } from '../../domain/consortium-repository.interface';
import { Consortium } from '../../domain/consortium.entity';
import { UpdateConsortiumInputDto } from '../dto/update-consortium.input.dto';
import { ConsortiumNotFoundError } from '../errors/consortium-not-found.error';

export class UpdateConsortiumUseCase {
  constructor(private readonly consortiumRepository: IConsortiumRepository) {}

  async execute(
    id: string,
    updateConsortiumInputDto: UpdateConsortiumInputDto,
    administratorId: string,
  ): Promise<void> {
    const existingConsortium = await this.consortiumRepository.findById(id);

    if (!existingConsortium) {
      throw new ConsortiumNotFoundError(id);
    }

    existingConsortium.isAdministrator(administratorId);

    const updatedConsortium = new Consortium(
      id,
      updateConsortiumInputDto.name ?? existingConsortium.name,
      updateConsortiumInputDto.taxId ?? existingConsortium.taxId,
      updateConsortiumInputDto.address ?? existingConsortium.address,
      existingConsortium.administratorId,
    );

    await this.consortiumRepository.update(updatedConsortium);
  }
}
