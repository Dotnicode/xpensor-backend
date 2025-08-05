import { ISettlement } from 'src/shared/interfaces/settlement.interface';
import { UnitProration } from 'src/shared/types/unit-proration.type';
import { YearMonth } from 'src/shared/types/year-month.type';

export class PreviewSettlementInputDto {
  consortiumId: string;
  period: YearMonth;
}

// TODO -> improve the implementation type
export class PreviewSettlementOutputDto implements Partial<ISettlement> {
  consortiumId: string;
  period: YearMonth;
  expenseIds: string[];
  summary: UnitProration[];
  total: number;
}
