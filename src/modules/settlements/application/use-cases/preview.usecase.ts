import { IConsortiumRepository } from 'src/modules/consortiums/domain/consortium-repository.interface';
import { IUnitRepository } from 'src/modules/units/domain/interfaces/repository.interface';
import { ISettlementRepository } from '../../domain/interfaces/repository.interface';
import {
  PreviewSettlementInputDto,
  PreviewSettlementOutputDto,
} from '../dto/preview.dto';

export class PreviewSettlementUseCase {
  constructor(
    private readonly settlementRepository: ISettlementRepository,
    private readonly consortiumRepository: IConsortiumRepository,
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
