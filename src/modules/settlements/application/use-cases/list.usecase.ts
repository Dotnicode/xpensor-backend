import { ISettlementRepository } from '../../domain/interfaces/repository.interface';

export class ListSettlementUseCase {
  constructor(private readonly settlementRepository: ISettlementRepository) {}

  async execute(consortiumId: string) {
    return this.settlementRepository.list(consortiumId);
  }
}
