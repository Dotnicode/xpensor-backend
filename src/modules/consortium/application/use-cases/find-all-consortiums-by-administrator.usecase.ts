import {
    IConsortiumRepository
} from 'src/modules/consortium/domain/consortium-repository.interface';

import { Consortium } from '../../domain/consortium.entity';

export class FindAllByAdministratorConsortiumsUseCase {
  constructor(private readonly consortiumRepository: IConsortiumRepository) {}

  async execute(administratorId: string): Promise<Consortium[]> {
    const consortiums =
      await this.consortiumRepository.findAllByAdministratorId(administratorId);

    return consortiums;
  } 
}
