import { IConsortiumRepository } from 'src/modules/consortiums/domain/consortium-repository.interface';
import { ISettlementRepository } from '../../domain/interfaces/repository.interface';
import { SettlementEntity } from '../../domain/settlement.entity';
import { CloseSettlementInputDto } from '../dto/close.dto';
import { IUnitRepository } from 'src/modules/units/domain/interfaces/repository.interface';

export class CloseSettlementUseCase {
  constructor(
    private readonly settlementRepository: ISettlementRepository,
    private readonly consortiumRepository: IConsortiumRepository,
    private readonly unitRepository: IUnitRepository,
  ) {}

  execute(inputDto: CloseSettlementInputDto): Promise<SettlementEntity> {
    throw new Error('CloseSettlementUseCase not implemented.');
    // const consortium = await this.consortiumRepository.findById(
    //   inputDto.consortiumId,
    // );
    // if (!consortium) {
    //   throw new ConsortiumNotExistsException(inputDto.consortiumId);
    // }

    // const isSettlementExists = await this.settlementRepository.findByPeriod(
    //   inputDto.consortiumId,
    //   inputDto.period,
    // );
    // if (isSettlementExists || isBeforeCurrentPeriod(inputDto.period)) {
    //   throw new ClosedSettlementException(inputDto.period);
    // }

    // const expenses = await this.expenseRepository.findByMonth(
    //   new Date(inputDto.period),
    //   consortium.id,
    // );

    // const units = await this.unitRepository.findAllByConsortiumId(
    //   consortium.id,
    // );

    // const totalProrated = sumProratedExpenses(expenses);

    // const summary: UnitProration[] = units.map((unit) => ({
    //   unitId: unit.id,
    //   label: `${unit.floor}-${unit.apartment}`,
    //   percentage: unit.percentage,
    //   amount: (unit.percentage / 100) * totalProrated,
    // }));

    // const settlement = await this.settlementRepository.create(
    //   consortium.id,
    //   inputDto.period,
    //   expenses.map((e) => e.id),
    //   summary,
    //   totalProrated,
    // );

    // if (!settlement) {
    //   throw new Error('Settlement could not be created');
    // }

    // return settlement;
  }
}
