import { YearMonth } from '../types/year-month.type';
import { UnitProration } from '../types/unit-proration.type';

export interface ISettlement {
  id: string;
  consortiumId: string;
  period: YearMonth;
  expenses: string[];
  summary: UnitProration[];
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
}
