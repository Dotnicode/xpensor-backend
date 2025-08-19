import { ISettlementRepository } from "src/shared/interfaces/settlement.interface";
import { Settlement } from "../../domain/entities/settlement.entity";
import { Period, PeriodString } from "src/shared/value-objects/period.vo";

export class FindSettlementByPeriodUseCase {
  constructor(private readonly settlementRepository: ISettlementRepository) {}

  async execute(consortiumId: string, period: PeriodString): Promise<Settlement | null> {
    return await this.settlementRepository.findByPeriod(consortiumId, period);
  }
}
