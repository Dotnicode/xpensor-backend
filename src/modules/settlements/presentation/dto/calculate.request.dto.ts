import { IsString, IsUUID, Matches } from 'class-validator';
import { YearMonth } from 'src/shared/types/year-month.type';

export class CalculateSettlementRequestDto {
  @IsUUID()
  consortiumId: string;

  @IsString()
  @Matches(/^\d{4}-\d{2}$/, { message: 'Period must be in YYYY-MM format' })
  period: YearMonth;
}
