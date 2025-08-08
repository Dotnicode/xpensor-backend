import { Injectable } from '@nestjs/common';
import { RepositoryBaseMapper } from 'src/shared/utils/repository-base-mapper.util';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransacionOrmEntity } from '../repository/transaction.schema';
import { TransactionType } from 'src/shared/enums/transaction-type.enum';
import { TransactionSource } from 'src/shared/enums/transaction-source.enum';
import { Period } from 'src/shared/types/period.type';

@Injectable()
export class TransactionRepositoryMapper extends RepositoryBaseMapper<
  Transaction,
  TransacionOrmEntity
> {
  toDomain(orm: TransacionOrmEntity): Transaction {
    return new Transaction(
      orm.id,
      orm.consortiumId,
      orm.unitId,
      orm.type as TransactionType,
      orm.source as TransactionSource,
      orm.description,
      orm.amount,
      orm.period.substring(0, 7) as Period,
      orm.createdAt,
    );
  }

  toOrm(domain: Transaction): Partial<TransacionOrmEntity> {
    return {
      id: domain.id,
      consortiumId: domain.consortiumId,
      unitId: domain.unitId,
      type: domain.type,
      source: domain.source,
      description: domain.description,
      amount: domain.amount,
      period: domain.period,
      createdAt: domain.createdAt,
    };
  }
}
