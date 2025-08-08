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
    const transactions = await this.transactionRepository.listByPeriod(
      period,
      consortiumId,
    );

    return transactions.map((t) => ({
      id: t.id,
      consortiumId: t.consortiumId,
      unitId: t.unitId,
      type: t.type,
      source: t.source,
      description: t.description,
      amount: t.amount.amount,
      period: t.period,
      createdAt: t.createdAt,
    }));
  }
}
