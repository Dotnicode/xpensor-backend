import { IConsortiumRepository } from 'src/modules/consortiums/domain/consortium-repository.interface';
import { IExpenseRepository } from 'src/modules/expenses/domain/expense-repository.interface';
import { IUnitRepository } from 'src/modules/units/domain/unit-repository.interface';
import { UnitProration } from 'src/shared/types/unit-proration.type';
import { ISettlementRepository } from '../../domain/interfaces/repository.interface';
import {
  PreviewSettlementInputDto,
  PreviewSettlementOutputDto,
} from '../dto/preview.dto';
import { ClosedSettlementException } from '../exceptions/close.exception';
import { ConsortiumNotExistsException } from '../exceptions/consortium-not-exists.exception';
import { sumProratedExpenses } from '../utils/unit-prorations.util';

export class PreviewSettlementUseCase {
  constructor(
    private readonly settlementRepository: ISettlementRepository,
    private readonly consortiumRepository: IConsortiumRepository,
    private readonly expenseRepository: IExpenseRepository,
    private readonly unitRepository: IUnitRepository,
  ) {}

  execute(
    request: PreviewSettlementInputDto,
  ): Promise<PreviewSettlementOutputDto> {
    throw new Error('PreviewSettlementUseCase not implemented');

    // const consortium = await this.consortiumRepository.findById(
    //   request.consortiumId,
    // );
    // if (!consortium) {
    //   throw new ConsortiumNotExistsException(request.consortiumId);
    // }
    // const isSettlementExists = await this.settlementRepository.findByPeriod(
    //   request.consortiumId,
    //   request.period,
    // );
    // if (
    //   isSettlementExists ||
    //   (new Date().getMonth() > new Date(request.period).getMonth() &&
    //     new Date().getFullYear() === new Date(request.period).getFullYear())
    // ) {
    //   throw new ClosedSettlementException(request.period);
    // }
    // const expenses = await this.expenseRepository.findByMonth(
    //   new Date(request.period),
    //   request.consortiumId,
    // );
    // const expenseIds = expenses.map((e) => e.id);
    // const totalProrated = sumProratedExpenses(expenses);
    // const units = await this.unitRepository.findAllByConsortiumId(
    //   request.consortiumId,
    // );
    // const summary: UnitProration[] = units.map((unit) => ({
    //   unitId: unit.id,
    //   label: `${unit.floor}-${unit.apartment}`,
    //   percentage: unit.percentage,
    //   amount: (unit.percentage / 100) * totalProrated,
    // }));
    // return {
    //   consortiumId: consortium.id,
    //   period: request.period,
    //   expenseIds: expenseIds,
    //   summary,
    //   total: totalProrated,
    // } as PreviewSettlementOutputDto;
  }
}
