import { Settlement } from '../entities/settlement.entity';

export interface IReportGenerator {
  generate(settlement: Settlement): Promise<Buffer>;
}
