import { NotFoundException } from '@nestjs/common';
import { IConsortiumRepository } from 'src/consortium/domain/consortium-repository.interface';
import { Consortium } from 'src/consortium/domain/consortium.entity';

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
