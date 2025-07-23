import { IConsortiumRepository } from '../../domain/consortium-repository.interface';
import { Consortium } from '../../domain/consortium.entity';
import { UpdateConsortiumInput } from '../dto/update-consortium.input';
import { ConsortiumNotFoundError } from '../errors/consortium-not-found.error';

export class UpdateConsortiumUseCase {
  constructor(private readonly consortiumRepository: IConsortiumRepository) {}

  async execute(
    id: string,
    updateConsortiumInput: UpdateConsortiumInput,
    administratorId: string,
  ): Promise<void> {
    const existingConsortium = await this.consortiumRepository.findById(id);

    if (!existingConsortium) {
      throw new ConsortiumNotFoundError(id);
    }

    existingConsortium.isAdministrator(administratorId);

    const updatedConsortium = new Consortium(
      id,
      updateConsortiumInput.name ?? existingConsortium.name,
      updateConsortiumInput.taxId ?? existingConsortium.taxId,
      updateConsortiumInput.address ?? existingConsortium.address,
      existingConsortium.administratorId,
    );

    await this.consortiumRepository.update(updatedConsortium);
  }
}
