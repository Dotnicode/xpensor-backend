export class ClosedSettlementException extends Error {
  constructor(period: string) {
    super(`Period ${period} is already closed`);
  }
}
