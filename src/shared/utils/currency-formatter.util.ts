import { Money } from '../value-objects/money.vo';

export class CurrencyFormatter {
  static toARS(value: number | Money) {
    if (value instanceof Money) {
      value = value.amount;
    }
    if (typeof value !== 'number') {
      throw new Error('Value must be a number or a Money instance');
    }
    return Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
    }).format(value);
  }
}
