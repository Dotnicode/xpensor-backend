export class Consortium {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly taxId: string,
    public readonly address: string,
    public readonly ownerId: string,
  ) {}

  isValidTaxId(taxId: string) {
    return /^[0-9]{11}$/.test(taxId);
  }
}
