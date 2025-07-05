import { v4 as uuidv4 } from 'uuid';

import { BadRequestException } from '@nestjs/common';

import { IConsortiumRepository } from '../../domain/consortium-repository.interface';
import { Consortium } from '../../domain/consortium.entity';

export class CreateConsortiumUseCase {
  constructor(private readonly consortiumRepository: IConsortiumRepository) {}

  async execute(
    name: string,
    taxId: string,
    address: string,
    ownerId: string,
  ): Promise<void> {
    const consortium = new Consortium(uuidv4(), name, taxId, address, ownerId);

    await this.consortiumRepository.save(consortium);
  }
}
