import { IConsortiumRepository } from 'src/modules/consortium/domain/consortium-repository.interface';

import { Consortium } from '../../domain/consortium.entity';

export class ListConsortiumsByUserIdUseCase {
  constructor(private readonly consortiumRepository: IConsortiumRepository) {}

  async execute(userId: string): Promise<Consortium[]> {
    const consortiums = await this.consortiumRepository.listByUserId(userId);

    return consortiums;
  }
}
