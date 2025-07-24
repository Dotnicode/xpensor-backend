export class ExpenseEntity {
  constructor(
    public readonly id: string,
    public readonly description: string | undefined,
    public readonly amount: number,
    public readonly date: Date,
    public readonly category: string | undefined,
    public readonly consortiumId: string,
  ) {}
}
