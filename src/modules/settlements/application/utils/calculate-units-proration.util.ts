import { IUnit } from 'src/shared/interfaces/unit.interface';
import { UnitProration } from 'src/shared/types/unit-proration.type';
import { Money } from 'src/shared/value-objects/money.vo';
import { prorateWithRounding } from './proration-rounding.util';

export function calculateUnitsProration(units: IUnit[], totalExpenses: Money): UnitProration[] {
  return prorateWithRounding(units, totalExpenses, 0.5).map((u) => ({
    unitId: u.id,
    responsibleParty: units.find((orig) => orig.id === u.id)?.responsibleParty ?? null,
    floor: units.find((orig) => orig.id === u.id)!.floor,
    division: units.find((orig) => orig.id === u.id)!.division,
    percentage: u.percentage,
    amount: u.amount,
  }));
}
