import { IConsortiumRepository } from 'src/modules/consortiums/domain/interfaces/repository.interface';
import { IUnitRepository } from 'src/modules/units/domain/interfaces/repository.interface';
import { ConsortiumNotExistsException } from 'src/shared/exceptions/consortium-not-exists.exception';
import { ITransactionRepository } from 'src/shared/interfaces/transaction.interface';
import { UnitProration } from 'src/shared/types/unit-proration.type';
import { Money } from 'src/shared/value-objects/money.vo';
import { Period, PeriodString } from 'src/shared/value-objects/period.vo';

import { ISettlementRepository } from '../../domain/interfaces/repository.interface';
import { TransactionSnapshot } from '../../domain/types/transaction-snapshot.type';
import { FindSettlementByPeriodInputDto } from '../dto/find-by-period.dto';
import { SettlementOutputDto } from '../dto/settlement.dto';
import { calculateTotals } from '../utils/calculate-total.util';
import { prorateWithRounding } from '../utils/proration-rounding.util';

export class FindSettlementByPeriodUseCase {
  constructor(
    private readonly settlementRepository: ISettlementRepository,
    private readonly consortiumRepository: IConsortiumRepository,
    private readonly unitRepository: IUnitRepository,
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async execute(inputDto: FindSettlementByPeriodInputDto): Promise<SettlementOutputDto> {
    const consortium = await this.consortiumRepository.findById(inputDto.consortiumId);
    if (!consortium) {
      throw new ConsortiumNotExistsException(inputDto.consortiumId);
    }

    const isSettlementExists = await this.settlementRepository.findByPeriod(
      inputDto.consortiumId,
      inputDto.period,
    );
    const isPeriodClosed = this.isPreviousPeriod(inputDto.period);
    const closed = !!isSettlementExists || isPeriodClosed;

    const transactions = await this.transactionRepository.listByPeriod(
      inputDto.period,
      inputDto.consortiumId,
    );

    const transactionsSnapshot: TransactionSnapshot[] = transactions.map((t) => ({
      id: t.id,
      consortiumId: t.consortiumId,
      unitId: t.unitId,
      type: t.type,
      source: t.source,
      description: t.description,
      amount: t.amount,
      period: t.period,
      createdAt: t.createdAt,
    }));

    const currentPeriod = Period.fromString(inputDto.period);
    const previousPeriod = currentPeriod.previousPeriod();

    const previousSettlement = await this.settlementRepository.findByPeriod(
      inputDto.consortiumId,
      previousPeriod.toString(),
    );

    const initialCash = previousSettlement ? previousSettlement.finalCash : Money.zero();
    const { totalExpenses, totalIncomes } = calculateTotals(transactionsSnapshot);
    const unitsProration = await this.calculateUnitsProration(inputDto.consortiumId, totalExpenses);
    const finalCash = initialCash.add(totalIncomes).subtract(totalExpenses);

    return {
      transactions: transactionsSnapshot.map((t) => ({
        ...t,
        amount: t.amount.amount,
      })),
      proration: unitsProration.map((u) => ({
        ...u,
        amount: u.amount.amount,
      })),
      initialCash: initialCash.amount,
      expenses: totalExpenses.amount,
      incomes: totalIncomes.amount,
      finalCash: finalCash.amount,
      period: inputDto.period,
      closed,
    };
  }

  private isPreviousPeriod(period: PeriodString): boolean {
    const currPeriod = Period.fromString(period);
    const now = Period.fromDate();
    return currPeriod.isBefore(now);
  }

  private async calculateUnitsProration(
    consortiumId: string,
    totalExpenses: Money,
  ): Promise<UnitProration[]> {
    const units = await this.unitRepository.listByConsortiumId(consortiumId);

    return prorateWithRounding(units, totalExpenses, 0.5).map((u) => ({
      unitId: u.id,
      responsibleParty: units.find((orig) => orig.id === u.id)?.responsibleParty ?? null,
      floor: units.find((orig) => orig.id === u.id)!.floor,
      division: units.find((orig) => orig.id === u.id)!.division,
      percentage: u.percentage,
      amount: u.amount,
    }));
  }
}
