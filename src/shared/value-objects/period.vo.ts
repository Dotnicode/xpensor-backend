export type PeriodString =
  `${number}-${'01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'}`;

export class Period {
  private readonly _year: number;
  private readonly _month: number;

  private constructor(year: number, month: number) {
    if (!Number.isInteger(year) || year < 0) throw new Error('Invalid year');
    if (!Number.isInteger(month) || month < 1 || month > 12) throw new Error('Invalid month');
    this._year = year;
    this._month = month;
    Object.freeze(this);
  }

  // ---------- Factories ----------
  static fromString(period: string): Period {
    const periodLocal = /^\d{4}-(0[1-9]|1[0-2])$/;
    if (!periodLocal.test(period)) throw new Error('Invalid Period format YYYY-MM');
    const [year, month] = period.split('-').map(Number);
    return new Period(year, month);
  }

  static fromYearMonth(year: number, month: number): Period {
    return new Period(year, month);
  }

  static fromDate(date = new Date()): Period {
    return new Period(date.getFullYear(), date.getMonth() + 1);
  }

  // ---------- Getters ----------
  get year(): number {
    return this._year;
  }
  get month(): number {
    return this._month;
  }
  get previousPeriod(): Period {
    return this._month > 1
      ? new Period(this._year, this._month - 1)
      : new Period(this._year - 1, 12);
  }
  get nextPeriod(): Period {
    return this._month < 12
      ? new Period(this._year, this._month + 1)
      : new Period(this._year + 1, 1);
  }

  toString(): PeriodString {
    return `${this._year}-${String(this._month).padStart(2, '0')}` as PeriodString;
  }

  // ---------- Comparisons ----------
  equals(other: Period): boolean {
    return this._year === other._year && this._month === other._month;
  }
  /** -1 if this<other, 0 if equal, 1 if this>other */
  compare(other: Period): number {
    if (this._year !== other._year) return this._year < other._year ? -1 : 1;
    if (this._month !== other._month) return this._month < other._month ? -1 : 1;
    return 0;
  }
  isBefore(other: Period): boolean {
    return this.compare(other) === -1;
  }
  isAfter(other: Period): boolean {
    return this.compare(other) === 1;
  }
  isPreviousPeriod(): boolean {
    const currPeriod = Period.fromString(this.toString());
    const now = Period.fromDate();
    return currPeriod.isBefore(now);
  }

  // ---------- Utilities ----------
  toDateRange(): { start: Date; endExclusive: Date } {
    const start = new Date(this._year, this._month - 1, 1, 0, 0, 0, 0);
    const endExclusive = this.nextPeriod.asMonthStartDate();
    return { start, endExclusive };
  }
  asMonthStartDate(): Date {
    return new Date(this._year, this._month - 1, 1, 0, 0, 0, 0);
  }

  // ---------- Serialization ----------
  toJSON(): PeriodString {
    return this.toString();
  }
}
