import { SettlementEntity } from '../settlement.entity';

export interface IReportGenerator {
  generate(settlement: SettlementEntity): Promise<Buffer>;
}
