import { NotFoundException } from '@nestjs/common';

import { ConsortiumRepository } from '../../infrastructure/repositories/consortium.repository';

export class DeleteConsortiumUseCase {
  constructor(private readonly consortiumRepository: ConsortiumRepository) {}

  async execute(id: string, userId: string): Promise<void> {
    const consortium = await this.consortiumRepository.findById(id);

    if (!consortium) {
      throw new NotFoundException('Consortium not found');
    }

    consortium.isOwner(userId);

    await this.consortiumRepository.delete(id);
  }
}
