import { YearMonth } from '../types/year-month.type';

export interface ISettlement {
  id: string;
  consortiumId: string;
  amount: number;
  period: YearMonth;
  createdAt?: Date;
}
