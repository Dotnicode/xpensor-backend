import { IConsortiumRepository } from 'src/modules/consortiums/domain/consortium-repository.interface';
import { IExpenseRepository } from 'src/modules/expenses/domain/expense-repository.interface';
import { IUnitRepository } from 'src/modules/units/domain/unit-repository.interface';
import { isBeforeCurrentPeriod } from 'src/shared/utils/date-helpers.util';
import { ISettlementRepository } from '../../domain/interfaces/repository.interface';
import { CloseSettlementInputDto } from '../dto/close.dto';
import { ClosedSettlementException } from '../exceptions/close.exception';
import { ConsortiumNotExistsException } from '../exceptions/consortium-not-exists.exception';
import { SettlementEntity } from '../../domain/settlement.entity';
import { UnitProration } from 'src/shared/types/unit-proration.type';
import { sumProratedExpenses } from '../utils/unit-prorations.util';

export class CloseSettlementUseCase {
  constructor(
    private readonly settlementRepository: ISettlementRepository,
    private readonly consortiumRepository: IConsortiumRepository,
    private readonly expenseRepository: IExpenseRepository,
    private readonly unitRepository: IUnitRepository,
  ) {}

  async execute(request: CloseSettlementInputDto): Promise<SettlementEntity> {
    const consortium = await this.consortiumRepository.findById(
      request.consortiumId,
    );
    if (!consortium) {
      throw new ConsortiumNotExistsException(request.consortiumId);
    }

    const isSettlementExists = await this.settlementRepository.findByPeriod(
      request.consortiumId,
      request.period,
    );
    if (isSettlementExists || isBeforeCurrentPeriod(request.period)) {
      throw new ClosedSettlementException(request.period);
    }

    const expenses = await this.expenseRepository.findByMonth(
      new Date(request.period),
      consortium.id,
    );

    const units = await this.unitRepository.findAllByConsortiumId(
      consortium.id,
    );

    const totalProrated = sumProratedExpenses(expenses);

    const summary: UnitProration[] = units.map((unit) => ({
      unitId: unit.id,
      label: `${unit.floor}-${unit.apartment}`,
      percentage: unit.percentage,
      amount: (unit.percentage / 100) * totalProrated,
    }));

    const settlement = await this.settlementRepository.create(
      consortium.id,
      request.period,
      expenses.map((e) => e.id),
      summary,
      totalProrated,
    );

    if (!settlement) {
      throw new Error('Settlement could not be created');
    }

    return settlement;
  }
}
