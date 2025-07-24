import { NotFoundException } from '@nestjs/common';

import { IConsortiumRepository } from '../../domain/consortium-repository.interface';
import { Consortium } from '../../domain/consortium.entity';

export class FindConsortiumByIdUseCase {
  constructor(private readonly consortiumRepository: IConsortiumRepository) {}

  async execute(
    consortiumId: string,
    administratorId: string,
  ): Promise<Consortium> {
    const consortium = await this.consortiumRepository.findById(consortiumId);

    if (!consortium) {
      throw new NotFoundException('Consortium not found');
    }

    consortium.isAdministrator(administratorId);

    return consortium;
  }
}
