import { IConsortiumRepository } from 'src/shared/interfaces/consortium.interface';
import { ConsortiumNotExistsException } from '../exceptions/consortium-not-exists.exception';

export class DeleteConsortiumUseCase {
  constructor(private readonly consortiumRepository: IConsortiumRepository) {}

  async execute(id: string, userId: string): Promise<void> {
    const consortium = await this.consortiumRepository.findById(id);

    if (!consortium) {
      throw new ConsortiumNotExistsException(id);
    }

    await this.consortiumRepository.delete(id);
  }
}
