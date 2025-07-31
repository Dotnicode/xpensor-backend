import { IConsortiumRepository } from 'src/modules/consortium/domain/consortium-repository.interface';
import { IExpenseRepository } from 'src/modules/expenses/domain/expense-repository.interface';
import { IUnitRepository } from 'src/modules/unit/domain/unit-repository.interface';
import { IExpense } from 'src/shared/interfaces/expense.interface';
import { UnitProration } from 'src/shared/types/unit-proration.type';
import { ISettlementRepository } from '../../domain/settlement.repository.interface';
import {
  PreviewSettlementInputDto,
  PreviewSettlementOutputDto,
} from '../dto/preview.dto';
import { ConsortiumNotExistsException } from '../exceptions/consortium-not-exists.exception';
import { CloseSettlementException } from '../exceptions/close.exception';

export class PreviewSettlementUseCase {
  constructor(
    private readonly settlementRepository: ISettlementRepository,
    private readonly consortiumRepository: IConsortiumRepository,
    private readonly expenseRepository: IExpenseRepository,
    private readonly unitRepository: IUnitRepository,
  ) {}

  async execute(
    request: PreviewSettlementInputDto,
  ): Promise<PreviewSettlementOutputDto> {
    const consortium = await this.consortiumRepository.findById(
      request.consortiumId,
    );
    if (!consortium) {
      throw new ConsortiumNotExistsException(request.consortiumId);
    }

    const isSettlementExists = await this.settlementRepository.find(
      request.consortiumId,
      request.period,
    );
    if (isSettlementExists) {
      throw new CloseSettlementException(request.period);
    }

    const expenses = await this.expenseRepository.findByMonth(
      new Date(request.period),
      request.consortiumId,
    );

    const expenseIds = expenses.map((e) => e.id);
    const totalProrated = this.sumProratedExpenses(expenses);
    const units = await this.unitRepository.findAllByConsortiumId(
      request.consortiumId,
    );
    const summary: UnitProration[] = units.map((unit) => ({
      unitId: unit.id,
      unitLabel: `${unit.floor}-${unit.apartment}`,
      amount: (unit.percentage / 100) * totalProrated,
    }));

    return {
      consortiumId: consortium.id,
      period: request.period,
      expenses: expenseIds,
      summary,
      total: totalProrated,
    };
  }

  sumProratedExpenses(expenses: IExpense[]) {
    const totalProrated = expenses
      .filter((expense) => expense.isProrated)
      .reduce((acc, expense) => acc + expense.amount, 0);

    return totalProrated;
  }
}
