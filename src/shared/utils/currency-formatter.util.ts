export class CurrencyFormatter {
  static toARS(value: number) {
    return Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
    }).format(value);
  }
}
