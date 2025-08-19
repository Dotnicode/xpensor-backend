import { IConsortiumRepository } from 'src/modules/consortiums/domain/interfaces/repository.interface';
import { IUnitRepository } from 'src/modules/units/domain/interfaces/repository.interface';
import { ITransactionRepository } from 'src/shared/interfaces/transaction.interface';
import { Period } from 'src/shared/value-objects/period.vo';
import { ISettlementRepository } from '../../domain/interfaces/repository.interface';
import { CloseSettlementPeriodInputDto } from '../dto/close-period.dto';
import { CurrentPeriodCloseNotAllowedException } from '../exceptions/close-not-allowed.exception';
import { SettlementPeriodClosedException } from '../exceptions/period-closed.exception';
import { PrepareSettlementService } from '../services/prepare-settlement.service';

export class CloseSettlementPeriodUseCase {
  constructor(
    private readonly settlementRepository: ISettlementRepository,
    private readonly consortiumRepository: IConsortiumRepository,
    private readonly unitRepository: IUnitRepository,
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async execute(inputDto: CloseSettlementPeriodInputDto): Promise<void> {
    const currentPeriod = Period.fromString(inputDto.period);
    const isCurrentPeriod = currentPeriod.equals(Period.fromDate());

    if (isCurrentPeriod) {
      throw new CurrentPeriodCloseNotAllowedException();
    }

    const existingSettlement = await this.settlementRepository.findByPeriod(
      inputDto.consortiumId,
      inputDto.period,
    );

    if (existingSettlement) {
      throw new SettlementPeriodClosedException(inputDto.period);
    }

    const service = new PrepareSettlementService(
      this.settlementRepository,
      this.consortiumRepository,
      this.unitRepository,
      this.transactionRepository,
    );

    const prepared = await service.prepare(inputDto.consortiumId, inputDto.period);

    await this.settlementRepository.createWithCheck(
      inputDto.consortiumId,
      prepared.transactionsSnapshot,
      prepared.unitsProration,
      prepared.initialCash.amount,
      prepared.totalIncomes.amount,
      prepared.totalExpenses.amount,
      prepared.finalCash.amount,
      inputDto.period,
    );
  }
}
