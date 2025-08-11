import { IUnit } from 'src/shared/interfaces/unit.interface';
import { Money } from 'src/shared/value-objects/money.vo';

/**
 * Prorate the total amount among the units based on their percentage.
 * The rounding algorithm is used to ensure that the total amount is distributed accurately.
 */
export function prorateWithRounding(
  units: IUnit[],
  total: Money,
  tolerance = 1,
): Array<IUnit & { amount: Money }> {
  if (!units || units.length === 0) {
    return [];
  }
  if (!total) {
    throw new Error('Total amount is required');
  }

  const totalPercentage = units.reduce((sum, u) => sum + u.percentage, 0);
  const totalCents = total.cents;

  let normalizedUnits = units;

  const percentageDiff = Math.abs(totalPercentage - 100);

  if (percentageDiff !== 0) {
    if (percentageDiff > 0 && percentageDiff <= tolerance) {
      console.warn(
        `Normalizing percentages: ${totalPercentage.toFixed(6)}% → 100% (diff: ${percentageDiff.toFixed(6)}%, tolerance: ${tolerance.toFixed(2)}%)`,
      );
      normalizedUnits = units.map((u) => ({
        ...u,
        percentage: (u.percentage / totalPercentage) * 100,
      }));
    } else {
      throw new Error(
        `Total percentage does not match 100%: ${totalPercentage.toFixed(6)}% (diff: ${percentageDiff.toFixed(6)}%, tolerance: ${tolerance.toFixed(2)}%)`,
      );
    }
  }

  const provisional = normalizedUnits.map((u) => {
    const ideal = totalCents * (u.percentage / 100);
    const baseCents = Math.floor(ideal);
    const residue = ideal - baseCents;
    return { ...u, baseCents, residue };
  });

  const assignedTotal = provisional.reduce((sum, u) => sum + u.baseCents, 0);
  const diff = totalCents - assignedTotal;

  if (diff !== 0) {
    // Order by residue descending if diff > 0 (we need to add),
    // or ascending if diff < 0 (we need to subtract).
    provisional.sort((a, b) => (diff > 0 ? b.residue - a.residue : a.residue - b.residue));

    for (let i = 0; i < Math.abs(diff); i++) {
      provisional[i].baseCents += diff > 0 ? 1 : -1;
    }
  }

  return provisional.map((u) => ({
    ...u,
    amount: Money.fromCents(u.baseCents),
  }));
}
