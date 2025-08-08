import { IsString, IsUUID, Matches } from 'class-validator';
import { Period } from 'src/shared/types/period.type';
import { IsPeriod } from 'src/shared/validators/period.validator';

export class ListTransactionByPeriodRequestDto {
  @IsString()
  @IsPeriod()
  period: Period;

  @IsUUID()
  consortiumId: string;
}
