import { ISettlement } from 'src/shared/interfaces/settlement.interface';
import { UnitProration } from 'src/shared/types/unit-proration.type';
import { Period } from 'src/shared/types/period.type';

export class CloseSettlementInputDto {
  consortiumId: string;
  period: Period;
}

export class CloseSettlementOutputDto implements Partial<ISettlement> {
  id: string;
  consortiumId: string;
  transactions: string[]; // TODO -> implement Transaction[] type
  proration: UnitProration[];
  initialCash: number;
  incomes: number;
  expenses: number;
  finalCash: number;
  period: Period;
  createdAt: Date;
}
