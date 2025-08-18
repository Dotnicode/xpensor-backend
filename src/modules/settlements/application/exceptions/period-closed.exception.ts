import { PeriodString } from 'src/shared/value-objects/period.vo';

export class SettlementPeriodClosedException extends Error {
  constructor(period: PeriodString) {
    super(`Settlement period ${period} is already closed`);
  }
}
