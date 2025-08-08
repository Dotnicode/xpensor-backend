import {
  IConsortium,
  IConsortiumRepository,
} from 'src/shared/interfaces/consortium.interface';
import { ConsortiumNotExistsException } from '../exceptions/consortium-not-exists.exception';

export class FindConsortiumByIdUseCase {
  constructor(private readonly consortiumRepository: IConsortiumRepository) {}

  async execute(consortiumId: string, userId: string): Promise<IConsortium> {
    const consortium = await this.consortiumRepository.findById(consortiumId);

    if (!consortium) {
      throw new ConsortiumNotExistsException(consortiumId);
    }

    return consortium;
  }
}
