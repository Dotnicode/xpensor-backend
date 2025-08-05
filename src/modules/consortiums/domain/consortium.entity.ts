import { InvalidIdError } from './errors/invalid-id.error';
import { InvalidTaxIdException } from './errors/invalid-tax-id.error';
import { NotOwnerException } from './errors/not-owner.error';

export class Consortium {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly taxId: string,
    public readonly address: string,
    public readonly userId: string,
  ) {
    this.isValidTaxId();
    this.isValidId();
  }

  isValidId(): void {
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
        this.id,
      )
    ) {
      throw new InvalidIdError();
    }
  }

  isAdministrator(userId: string): void {
    if (this.userId !== userId) {
      throw new NotOwnerException();
    }
  }

  isValidTaxId(): void {
    if (!/^[0-9]{11}$/.test(this.taxId)) {
      throw new InvalidTaxIdException(this.taxId);
    }
  }
}
