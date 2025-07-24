export class UnitApartmentInvalidError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Unit Apartment Invalid Format Error';
  }
}
