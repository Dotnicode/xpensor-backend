import { PeriodString } from 'src/shared/value-objects/period.vo';

export class FindSettlementByPeriodInputDto {
  consortiumId: string;
  period: PeriodString;
}
