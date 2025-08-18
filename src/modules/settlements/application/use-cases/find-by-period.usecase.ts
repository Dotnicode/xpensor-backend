import { IConsortiumRepository } from 'src/modules/consortiums/domain/interfaces/repository.interface';
import { IUnitRepository } from 'src/modules/units/domain/interfaces/repository.interface';
import { ITransactionRepository } from 'src/shared/interfaces/transaction.interface';
import { ISettlementRepository } from '../../domain/interfaces/repository.interface';
import { FindSettlementByPeriodInputDto } from '../dto/find-by-period.dto';
import { SettlementOutputDto } from '../dto/settlement.output.dto';
import { PrepareSettlementService } from '../services/prepare-settlement.service';

export class FindSettlementByPeriodUseCase {
  constructor(
    private readonly settlementRepository: ISettlementRepository,
    private readonly consortiumRepository: IConsortiumRepository,
    private readonly unitRepository: IUnitRepository,
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async execute(inputDto: FindSettlementByPeriodInputDto): Promise<SettlementOutputDto> {
    const service = new PrepareSettlementService(
      this.settlementRepository,
      this.consortiumRepository,
      this.unitRepository,
      this.transactionRepository,
    );

    const prepared = await service.prepare(inputDto.consortiumId, inputDto.period, true);
    const closed = !!prepared.isSettlementExists || prepared.currentPeriod.isPreviousPeriod();

    return {
      transactions: prepared.transactionsSnapshot.map((t) => ({
        ...t,
        amount: t.amount.amount,
      })),
      proration: prepared.unitsProration.map((u) => ({
        ...u,
        amount: u.amount.amount,
      })),
      initialCash: prepared.initialCash.amount,
      expenses: prepared.totalExpenses.amount,
      incomes: prepared.totalIncomes.amount,
      finalCash: prepared.finalCash.amount,
      period: inputDto.period,
      closed,
    };
  }
}
