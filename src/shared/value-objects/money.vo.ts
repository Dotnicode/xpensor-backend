export class Money {
  private readonly _cents: number;

  private constructor(cents: number) {
    if (!Number.isFinite(cents)) throw new Error('Invalid money');
    this._cents = Math.round(cents);
    Object.freeze(this);
  }

  static fromAmount(amount: number): Money {
    if (!Number.isFinite(amount)) throw new Error('Invalid amount');
    return new Money(amount * 100);
  }

  static fromCents(cents: number): Money {
    return new Money(cents);
  }

  static zero(): Money {
    return new Money(0);
  }

  get amount(): number {
    return this._cents / 100;
  }

  get cents(): number {
    return this._cents;
  }

  add(other: Money): Money {
    return new Money(this._cents + other._cents);
  }

  subtract(other: Money): Money {
    return new Money(this._cents - other._cents);
  }

  multiply(factor: number): Money {
    if (!Number.isFinite(factor)) throw new Error('Invalid factor');
    // Ojo con redondeo bancario si lo necesitás:
    return new Money(Math.round(this._cents * factor));
  }

  equals(other: Money): boolean {
    return this._cents === other._cents;
  }

  abs(): Money {
    return this._cents < 0 ? Money.fromCents(-this._cents) : this;
  }

  isZero(): boolean {
    return this._cents === 0;
  }
  isPositive(): boolean {
    return this._cents > 0;
  }
  isNegative(): boolean {
    return this._cents < 0;
  }

  toString(): string {
    return this.amount.toFixed(2);
  }
  toJSON(): number {
    return this.amount;
  }
}
