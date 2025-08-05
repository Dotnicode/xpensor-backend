import { v4 as uuidv4 } from 'uuid';

import { IConsortiumRepository } from '../../domain/consortium-repository.interface';
import { Consortium } from '../../domain/consortium.entity';
import { CreateConsortiumInputDto } from '../dto/create-consortium.input.dto';

export class CreateConsortiumUseCase {
  constructor(private readonly consortiumRepository: IConsortiumRepository) {}

  async execute(
    input: CreateConsortiumInputDto,
    administratorId: string,
  ): Promise<void> {
    const consortium = new Consortium(
      uuidv4(),
      input.name,
      input.taxId,
      input.address,
      administratorId,
    );

    await this.consortiumRepository.create(consortium);
  }
}
