import { Money } from 'src/shared/value-objects/money.vo';

type Unit = {
  unitId: string;
  percentage: number;
};

export function prorateWithRounding(
  units: Unit[],
  total: Money,
): Array<Unit & { amount: Money }> {
  const totalCents = total.cents;

  // 1) Calcular asignación ideal y residuo
  const provisional = units.map((u) => {
    const ideal = totalCents * (u.percentage / 100);
    const baseCents = Math.floor(ideal); // o Math.round si preferís
    const residue = ideal - baseCents;
    return { ...u, baseCents, residue };
  });

  // 2) Ajustar hasta cuadrar
  const assignedTotal = provisional.reduce((sum, u) => sum + u.baseCents, 0);
  const diff = totalCents - assignedTotal;

  if (diff !== 0) {
    // Ordenar por residuo descendente si diff > 0 (hay que sumar),
    // o ascendente si diff < 0 (hay que restar).
    provisional.sort((a, b) =>
      diff > 0 ? b.residue - a.residue : a.residue - b.residue,
    );

    for (let i = 0; i < Math.abs(diff); i++) {
      provisional[i].baseCents += diff > 0 ? 1 : -1;
    }
  }

  // 3) Devolver con Money
  return provisional.map((u) => ({
    unitId: u.unitId,
    percentage: u.percentage,
    amount: Money.fromCents(u.baseCents),
  }));
}
