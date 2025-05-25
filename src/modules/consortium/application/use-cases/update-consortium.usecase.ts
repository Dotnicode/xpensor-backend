import { NotFoundException } from '@nestjs/common';

import { IConsortiumRepository } from '../../domain/consortium-repository.interface';
import { Consortium } from '../../domain/consortium.entity';
import { UpdateConsortiumDto } from '../dto/update-consortium.dto';

export class UpdateConsortiumUseCase {
  constructor(private readonly consortiumRepository: IConsortiumRepository) {}

  async execute(
    id: string,
    updateConsortiumDto: UpdateConsortiumDto,
    ownerId: string,
  ): Promise<void> {
    const existingConsortium = await this.consortiumRepository.findById(id);

    if (!existingConsortium) {
      throw new NotFoundException('Consortium not found');
    }

    existingConsortium.isOwner(ownerId);

    const updatedConsortium = new Consortium(
      id,
      updateConsortiumDto.name,
      updateConsortiumDto.taxId,
      updateConsortiumDto.address,
      existingConsortium.ownerId,
    );

    await this.consortiumRepository.update(updatedConsortium);
  }
}
