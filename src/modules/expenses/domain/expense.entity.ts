import { ExpenseType } from './enums/expense-type.enum';

export class ExpenseEntity {
  constructor(
    public readonly id: string,
    public readonly consortiumId: string,
    public readonly description: string,
    public readonly type: ExpenseType,
    public readonly category: string,
    public readonly amount: number,
    public readonly date: Date,
    public readonly isProrated: boolean,
  ) {
    this.validateAmount();
    this.validateDate();
  }

  private validateAmount() {
    if (this.amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
  }

  private validateDate() {
    if (
      this.date.getMonth() !== new Date().getMonth() &&
      this.date.getFullYear() !== new Date().getFullYear()
    ) {
      throw new Error('Date must be in the current month and year');
    }
  }
}
