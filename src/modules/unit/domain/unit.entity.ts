import { UnitApartmentInvalidError } from './exceptions/unit-apartment.exception';
import { UnitPercentageInvalidError } from './exceptions/unit-percentage.exception';

export class UnitEntity {
  constructor(
    public readonly id: string,
    public readonly floor: string,
    public readonly apartment: string,
    public readonly percentage: number,
    public readonly consortiumId: string,
  ) {
    this.validateUnitPercentage();
    this.validateApartment();
  }

  validateUnitPercentage(): void {
    if (this.percentage < 0 || this.percentage >= 100) {
      throw new UnitPercentageInvalidError(
        'The percentage must be greater or equal to 0 and less than or equal to 100',
      );
    }
  }

  validateApartment(): void {
    if (!/^[a-zA-Z0-9\- ]+$/.test(this.apartment)) {
      throw new UnitApartmentInvalidError(
        'The apartment must be a valid alphanumeric string, dash or space',
      );
    }
  }
}
