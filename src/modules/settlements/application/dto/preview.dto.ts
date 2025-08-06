import { ISettlement } from 'src/shared/interfaces/settlement.interface';
import { UnitProration } from 'src/shared/types/unit-proration.type';
import { Period } from 'src/shared/types/period.type';

export class PreviewSettlementInputDto {
  consortiumId: string;
  period: Period;
}

// TODO -> improve the implementation type
export class PreviewSettlementOutputDto implements Partial<ISettlement> {
  consortiumId: string;
  period: Period;
  expenseIds: string[];
  summary: UnitProration[];
  total: number;
}
