import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { IConsortiumRepository } from 'src/consortium/domain/consortium-repository.interface';

import { Consortium } from 'src/consortium/domain/consortium.entity';

export class FindConsortiumByIdUseCase {
  constructor(private readonly consortiumRepository: IConsortiumRepository) {}

  async execute(id: string, ownerId: string): Promise<Consortium> {
    const consortium = await this.consortiumRepository.findById(id);

    if (!consortium) {
      throw new NotFoundException('Consortium not found');
    }

    consortium.isOwner(ownerId);

    return consortium;
  }
}
