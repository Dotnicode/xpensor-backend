import { randomUUID } from 'crypto';
import { BaseUseCase } from 'src/shared/interfaces/base-usecase.interface';
import { IConsortiumRepository } from 'src/shared/interfaces/consortium.interface';
import { IUnitRepository } from 'src/shared/interfaces/unit.interface';
import { Transaction } from '../../domain/entities/transaction.entity';
import { ITransactionRepository } from '../../domain/interfaces/repository.interface';
import {
  TransactionInputDto,
  TransactionOutputDto,
} from '../dto/transaction.dto';
import { Money } from 'src/shared/value-objects/money.vo';

export class CreateTransactionUseCase implements BaseUseCase {
  constructor(
    private readonly consortiumRepository: IConsortiumRepository,
    private readonly unitRepository: IUnitRepository,
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async execute(request: TransactionInputDto): Promise<TransactionOutputDto> {
    const consortium = await this.consortiumRepository.findById(
      request.consortiumId,
    );
    if (!consortium) {
      throw new Error('Consortium not found');
    }

    if (request.unitId) {
      const unit = await this.unitRepository.findById(request.unitId);
      if (!unit) {
        throw new Error('Unit not found');
      }
    }

    const transaction = new Transaction(
      randomUUID(),
      request.consortiumId,
      request.unitId ?? null,
      request.type,
      request.source,
      request.description,
      Money.fromAmount(request.amount),
      request.period,
      new Date(),
    );

    await this.transactionRepository.create(transaction);

    return {
      id: transaction.id,
      consortiumId: transaction.consortiumId,
      unitId: transaction.unitId ?? null,
      amount: transaction.amount.amount,
      type: transaction.type,
      source: transaction.source,
      period: transaction.period,
      description: transaction.description,
      createdAt: transaction.createdAt,
    };
  }
}
