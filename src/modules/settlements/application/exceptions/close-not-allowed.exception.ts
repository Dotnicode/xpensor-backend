export class CurrentPeriodCloseNotAllowedException extends Error {
  constructor() {
    super('Cannot close the current settlement period');
  }
}