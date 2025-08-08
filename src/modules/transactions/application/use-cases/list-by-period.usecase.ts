import { BaseUseCase } from 'src/shared/interfaces/base-usecase.interface';
import { ITransactionRepository } from '../../domain/interfaces/repository.interface';
import { TransactionOutputDto } from '../dto/transaction.dto';

export class ListTransactionsByPeriodUseCase implements BaseUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(
    period: string,
    consortiumId: string,
  ): Promise<TransactionOutputDto[]> {
    return await this.transactionRepository.listByPeriod(period, consortiumId);
  }
}
