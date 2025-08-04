import { IReportGenerator } from '../../domain/interfaces/report.interface';
import { ISettlementRepository } from '../../domain/interfaces/repository.interface';

export class GenerateSettlementReportUseCase {
  constructor(
    private readonly reportGenerator: IReportGenerator,
    private readonly settlementRepository: ISettlementRepository,
  ) {}

  async execute(settlementId: string): Promise<Buffer> {
    const settlement = await this.settlementRepository.findById(settlementId);
    if (!settlement) {
      //TODO: apply custom exception "SettlementNotFoundError"
      throw new Error('Settlement not exists');
    }
    return this.reportGenerator.generate(settlement);
  }
}
