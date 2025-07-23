import { v4 as uuidv4 } from 'uuid';

import { IConsortiumRepository } from '../../domain/consortium-repository.interface';
import { Consortium } from '../../domain/consortium.entity';
import { CreateConsortiumInput } from '../dto/create-consortium.input';

export class CreateConsortiumUseCase {
  constructor(private readonly consortiumRepository: IConsortiumRepository) {}

  async execute(
    input: CreateConsortiumInput,
    administratorId: string,
  ): Promise<void> {
    const consortium = new Consortium(uuidv4(), input.name, input.taxId, input.address, administratorId);

    await this.consortiumRepository.save(consortium);
  }
}
