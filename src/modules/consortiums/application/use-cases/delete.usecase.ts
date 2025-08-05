import { IConsortiumRepository } from '../../domain/consortium-repository.interface';
import { ConsortiumNotExistsException } from '../exceptions/consortium-not-exists.exception';

export class DeleteConsortiumUseCase {
  constructor(private readonly consortiumRepository: IConsortiumRepository) {}

  async execute(id: string, userId: string): Promise<void> {
    const consortium = await this.consortiumRepository.findById(id);

    if (!consortium) {
      throw new ConsortiumNotExistsException(id);
    }

    consortium.isAdministrator(userId);

    await this.consortiumRepository.delete(id);
  }
}
