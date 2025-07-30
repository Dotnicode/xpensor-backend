import { IConsortiumRepository } from 'src/modules/consortium/domain/consortium-repository.interface';
import { IExpenseRepository } from 'src/modules/expenses/domain/expense-repository.interface';
import { IExpense } from 'src/shared/interfaces/expense.interface';
import { ISettlementRepository } from '../domain/settlement.repository.interface';
import { CalculateSettlementInputDto } from './dto/calculate.input.dto';
import { ConsortiumNotExistsException } from './exceptions/consortium-not-exists.exception';

export class CalculateSettlementUseCase {
  constructor(
    private readonly settlementRepository: ISettlementRepository,
    private readonly consortiumRepository: IConsortiumRepository,
    private readonly expenseRepository: IExpenseRepository,
  ) {}

  async execute(request: CalculateSettlementInputDto) {
    const consortium = await this.consortiumRepository.findById(
      request.consortiumId,
    );

    if (!consortium) {
      throw new ConsortiumNotExistsException(request.consortiumId);
    }

    const expenses = await this.expenseRepository.findByMonth(
      new Date(request.period),
      request.consortiumId,
    );

    const totalProrated = this.calculateTotalProrated(expenses);

    const settlement = await this.settlementRepository.save(
      request.consortiumId,
      totalProrated,
      request.period,
    );

    return settlement;
  }

  calculateTotalProrated(expenses: IExpense[]) {
    const totalProrated = expenses
      .filter((e) => e.isProrated)
      .reduce((acc, e) => acc + e.amount, 0);

    return totalProrated;
  }
}
