export class UnitPercentageInvalidError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Unit Percentage Invalid Error';
  }
}
