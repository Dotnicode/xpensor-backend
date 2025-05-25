import { InvalidTaxIdException } from './exceptions/invalid-tax-id.exception';
import { NotOwnerException } from './exceptions/not-owner.exception';

export class Consortium {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly taxId: string,
    public readonly address: string,
    public readonly ownerId: string,
  ) {
    this.isValidTaxId();
  }

  isOwner(ownerId: string): void {
    if (this.ownerId !== ownerId) {
      throw new NotOwnerException();
    }
  }

  isValidTaxId(): void {
    if (!/^[0-9]{11}$/.test(this.taxId)) {
      throw new InvalidTaxIdException(this.taxId);
    }
  }
}
