import { IsString, IsUUID, Matches } from 'class-validator';
import { Period } from 'src/shared/types/period.type';

export class CloseSettlementRequestDto {
  @IsUUID()
  consortiumId: string;

  @IsString()
  @Matches(/^(19\d{2}|20\d{2})-(0[1-9]|1[0-2])$/, {
    message:
      'Period must be in YYYY-MM format with valid year (1900-2099) and month (01-12)',
  })
  period: Period;
}
