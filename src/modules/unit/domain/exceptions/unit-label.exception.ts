export class UnitLabelInvalidError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Unit Label Invalid Error';
  }
}
