import { IConsortiumRepository } from 'src/modules/consortiums/domain/interfaces/repository.interface';
import { IUnitRepository } from 'src/modules/units/domain/interfaces/repository.interface';
import { ITransactionRepository } from 'src/shared/interfaces/transaction.interface';
import { ISettlementRepository } from '../../domain/interfaces/repository.interface';
import { FindSettlementByPeriodInputDto } from '../dto/find-by-period.dto';
import { PreviewCurrentSettlementPeriodOutputDto } from '../dto/preview-settlement.output.dto';
import { PrepareSettlementService } from '../services/prepare-settlement.service';
import { Period } from 'src/shared/value-objects/period.vo';
import { NotCurrentPeriodException } from '../exceptions/not-current-period.exception';

export class PreviewCurrentPeriodPeriodUseCase {
  constructor(
    private readonly settlementRepository: ISettlementRepository,
    private readonly consortiumRepository: IConsortiumRepository,
    private readonly unitRepository: IUnitRepository,
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async execute(
    inputDto: FindSettlementByPeriodInputDto,
  ): Promise<PreviewCurrentSettlementPeriodOutputDto> {
    const service = new PrepareSettlementService(
      this.settlementRepository,
      this.consortiumRepository,
      this.unitRepository,
      this.transactionRepository,
    );

    const isCurrentPeriod = Period.fromString(inputDto.period).equals(Period.fromDate());
    if (!isCurrentPeriod) {
      throw new NotCurrentPeriodException(inputDto.period);
    }

    const prepared = await service.prepare(inputDto.consortiumId, inputDto.period);

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
    };
  }
}
