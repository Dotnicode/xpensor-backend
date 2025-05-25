import {
    IConsortiumRepository
} from 'src/modules/consortium/domain/consortium-repository.interface';

import { NotFoundException } from '@nestjs/common';

import { Consortium } from '../../domain/consortium.entity';

export class FindAllByOwnerConsortiumsUseCase {
  constructor(private readonly consortiumRepository: IConsortiumRepository) {}

  async execute(ownerId: string): Promise<Consortium[]> {
    const consortiums =
      await this.consortiumRepository.findAllByOwnerId(ownerId);

    if (consortiums.length === 0) {
      throw new NotFoundException('No consortiums found');
    }

    return consortiums;
  }
}
