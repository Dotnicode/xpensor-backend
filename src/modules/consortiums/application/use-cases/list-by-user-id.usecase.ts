import {
  IConsortium,
  IConsortiumRepository,
} from 'src/shared/interfaces/consortium.interface';

export class ListConsortiumsByUserIdUseCase {
  constructor(private readonly consortiumRepository: IConsortiumRepository) {}

  async execute(userId: string): Promise<IConsortium[]> {
    const consortiums = await this.consortiumRepository.listByUserId(userId);

    return consortiums;
  }
}
