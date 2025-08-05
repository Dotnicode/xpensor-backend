import { NotFoundException } from '@nestjs/common';

import { IConsortiumRepository } from '../../domain/consortium-repository.interface';
import { Consortium } from '../../domain/consortium.entity';
import { ConsortiumNotExistsException } from '../exceptions/consortium-not-exists.exception';

export class FindConsortiumByIdUseCase {
  constructor(private readonly consortiumRepository: IConsortiumRepository) {}

  async execute(consortiumId: string, userId: string): Promise<Consortium> {
    const consortium = await this.consortiumRepository.findById(consortiumId);

    if (!consortium) {
      throw new ConsortiumNotExistsException(consortiumId);
    }

    consortium.isAdministrator(userId);

    return consortium;
  }
}
