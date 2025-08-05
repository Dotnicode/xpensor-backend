import { UnitProration } from 'src/shared/types/unit-proration.type';
import { YearMonth } from 'src/shared/types/year-month.type';

export class PreviewSettlementInputDto {
  consortiumId: string;
  period: YearMonth;
}

export class PreviewSettlementOutputDto {
  consortiumId: string;
  period: YearMonth;
  expenseIds: string[];
  summary: UnitProration[];
  total: number;
}
