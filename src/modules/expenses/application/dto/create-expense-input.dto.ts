export class CreateExpenseInputDto {
  description?: string;
  amount: number;
  date: Date;
  category?: string;
  consortiumId: string;
}
