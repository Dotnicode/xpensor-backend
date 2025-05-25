import { UnitLabelInvalidError } from './exceptions/unit-label.exception';
import { UnitPercentageInvalidError } from './exceptions/unit-percentage.exception';

export class UnitEntity {
  constructor(
    public readonly id: string,
    public readonly floor: string,
    public readonly label: string,
    public readonly percentage: number,
    public readonly consortiumId: string,
  ) {
    this.validateUnitPercentage();
    this.validateLabel();
  }

  validateUnitPercentage(): void {
    if (this.percentage < 0 || this.percentage >= 100) {
      throw new UnitPercentageInvalidError(
        'The percentage must be greater or equal to 0 and less than 100',
      );
    }
  }

  validateLabel(): void {
    if (!/^[a-zA-Z0-9\- ]+$/.test(this.label)) {
      throw new UnitLabelInvalidError(
        'The label must be a valid alphanumeric string, dash or space',
      );
    }
  }
}
