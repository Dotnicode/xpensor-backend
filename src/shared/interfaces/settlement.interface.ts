import { Period } from '../types/period.type';
import { UnitProration } from '../types/unit-proration.type';

export interface ISettlement {
  id: string;
  consortiumId: string;
  transactions: string[]; // TODO => implement Transaction[] type
  proration: UnitProration[];
  initialCash: number;
  incomes: number;
  expenses: number;
  finalCash: number;
  period: Period;
  createdAt: Date;
}
