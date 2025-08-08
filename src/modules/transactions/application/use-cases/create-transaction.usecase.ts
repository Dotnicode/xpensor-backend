import { randomUUID } from 'crypto';
import { BaseUseCase } from 'src/shared/interfaces/base-usecase.interface';
import { IUnitRepository } from 'src/shared/interfaces/unit.interface';
import { Transaction } from '../../domain/entities/transaction.entity';
import { ITransactionRepository } from '../../domain/interfaces/repository.interface';
import {
  TransactionInputDto,
  TransactionOutputDto,
} from '../dto/transaction.dto';
import { IConsortiumRepository } from 'src/shared/interfaces/consortium.interface';

export class CreateTransactionUseCase implements BaseUseCase {
  constructor(
    private readonly consortiumRepository: IConsortiumRepository,
    private readonly unitRepository: IUnitRepository,
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async execute(
    transactionInputDto: TransactionInputDto,
  ): Promise<TransactionOutputDto> {
    const consortium = await this.consortiumRepository.findById(
      transactionInputDto.consortiumId,
    );
    if (!consortium) {
      throw new Error('Consortium not found');
    }

    if (transactionInputDto.unitId) {
      const unit = await this.unitRepository.findById(
        transactionInputDto.unitId,
      );
      if (!unit) {
        throw new Error('Unit not found');
      }
    }

    const transaction = new Transaction(
      randomUUID(),
      transactionInputDto.consortiumId,
      transactionInputDto.unitId ?? null,
      transactionInputDto.type,
      transactionInputDto.source,
      transactionInputDto.description,
      transactionInputDto.amount,
      transactionInputDto.period,
      new Date(),
    );
    const db = await this.transactionRepository.create(transaction);

    return {
      id: transaction.id,
      consortiumId: transaction.consortiumId,
      unitId: transaction.unitId ?? null,
      amount: transaction.amount,
      type: transaction.type,
      source: transaction.source,
      period: transaction.period,
      description: transaction.description,
      createdAt: transaction.createdAt,
    };
  }
}
