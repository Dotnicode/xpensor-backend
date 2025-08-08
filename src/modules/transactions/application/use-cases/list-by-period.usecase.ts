import { BaseUseCase } from 'src/shared/interfaces/base-usecase.interface';
import { ITransactionRepository } from '../../domain/interfaces/repository.interface';
import { TransactionOutputDto } from '../dto/transaction.dto';
import { Period } from 'src/shared/types/period.type';

export class ListTransactionsByPeriodUseCase implements BaseUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(
    period: Period,
    consortiumId: string,
  ): Promise<TransactionOutputDto[]> {
    return await this.transactionRepository.listByPeriod(period, consortiumId);
  }
}
