import { IsString, IsUUID } from 'class-validator';
import { IsPeriod } from 'src/shared/validators/period.validator';
import { PeriodString } from 'src/shared/value-objects/period.vo';

export class PreviewSettlementRequestDto {
  @IsUUID()
  consortiumId: string;

  @IsString()
  @IsPeriod()
  period: PeriodString;
}
