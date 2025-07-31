export class CloseSettlementException extends Error {
  constructor(period: string) {
    super(`Settlement has been closed for period ${period}`);
  }
}
