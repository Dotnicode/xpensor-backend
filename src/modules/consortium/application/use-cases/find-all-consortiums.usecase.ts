import {
    IConsortiumRepository
} from 'src/modules/consortium/domain/consortium-repository.interface';

import { NotFoundException } from '@nestjs/common';

import { Consortium } from '../../domain/consortium.entity';

export class FindAllConsortiumsUseCase {
  constructor(private readonly consortiumRepository: IConsortiumRepository) {}

  async execute(): Promise<Consortium[]> {
    const consortiums = await this.consortiumRepository.findAll();

    if (consortiums.length === 0) {
      throw new NotFoundException('No consortiums found');
    }

    return consortiums;
  }
}
