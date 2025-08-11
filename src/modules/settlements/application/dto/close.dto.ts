import { PeriodString } from 'src/shared/value-objects/period.vo';

export class CloseSettlementInputDto {
  consortiumId: string;
  period: PeriodString;
}
