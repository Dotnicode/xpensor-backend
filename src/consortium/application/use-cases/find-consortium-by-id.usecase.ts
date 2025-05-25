import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { IConsortiumRepository } from 'src/consortium/domain/consortium-repository.interface';

import { Consortium } from 'src/consortium/domain/consortium.entity';

export class FindConsortiumByIdUseCase {
  constructor(private readonly consortiumRepository: IConsortiumRepository) {}

  async execute(id: string): Promise<Consortium> {
    const consortium = await this.consortiumRepository.findById(id);

    if (!consortium) {
      throw new NotFoundException('Consortium not found');
    }
    if (consortium.ownerId !== id) {
      throw new ForbiddenException('You are not the owner of this consortium');
    }

    return consortium;
  }
}
