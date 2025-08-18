import { PeriodString } from 'src/shared/value-objects/period.vo';

export class CloseSettlementPeriodInputDto {
  consortiumId: string;
  period: PeriodString;
}
