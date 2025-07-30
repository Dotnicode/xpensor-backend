import { ISettlement } from 'src/shared/interfaces/settlement.interface';
import { YearMonth } from 'src/shared/types/year-month.type';

export class SettlementEntity implements ISettlement {
  constructor(
    public readonly id: string,
    public readonly consortiumId: string,
    public readonly amount: number,
    public readonly period: YearMonth,
    public readonly createdAt?: Date,
  ) {}
}
