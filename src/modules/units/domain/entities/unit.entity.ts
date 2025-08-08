import { PercentageInvalidError } from '../exceptions/percentage.exception';
import { ResponsiblePartySnapshot } from '../interfaces/responsible-party-snapshot.type';
import { IUnit } from '../interfaces/unit.interface';

export class Unit implements IUnit {
  constructor(
    public readonly id: string,
    public readonly consortiumId: string,
    public readonly floor: string,
    public readonly division: string,
    public readonly percentage: number,
    public readonly responsibleParty?: ResponsiblePartySnapshot | null,
  ) {
    this.validateUnitPercentage();
  }

  validateUnitPercentage(): void {
    if (this.percentage < 0 || this.percentage >= 100) {
      throw new PercentageInvalidError(
        'The percentage must be greater or equal to 0 and less than or equal to 100',
      );
    }
  }
}
