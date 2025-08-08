import { Injectable } from '@nestjs/common';
import { TransactionSource } from 'src/shared/enums/transaction-source.enum';
import { TransactionType } from 'src/shared/enums/transaction-type.enum';
import { RepositoryBaseMapper } from 'src/shared/utils/repository-base-mapper.util';
import { Money } from 'src/shared/value-objects/money.vo';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransacionOrmEntity } from '../repository/transaction.schema';

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
      Money.fromCents(orm.amount_cents),
      orm.period,
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
      amount_cents: domain.amount.cents,
      period: domain.period,
      createdAt: domain.createdAt,
    };
  }
}
