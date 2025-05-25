export class InvalidTaxIdException extends Error {
  readonly invalidValue?: string;

  constructor(invalidValue?: string) {
    super(
      invalidValue
        ? `Invalid TaxID (CUIL): ${invalidValue}, must be 11 digits`
        : 'Invalid TaxID (CUIL), must be 11 digits',
    );

    this.name = 'InvalidTaxIdException';
    this.invalidValue = invalidValue;
  }
}
