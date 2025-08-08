import { RepositoryBaseMapper } from 'src/shared/utils/repository-base-mapper.util';
import { Settlement } from '../../domain/entities/settlement.entity';
import { TransactionSnapshot } from '../../domain/types/transaction-snapshot.type';
import { SettlementOrmEntity } from './settlement.schema';

export class SettlementRepositoryMapper extends RepositoryBaseMapper<
  Settlement,
  SettlementOrmEntity
> {
  toDomain(orm: SettlementOrmEntity): Settlement {
    return new Settlement(
      orm.id,
      orm.consortiumId,
      orm.transactions as unknown as TransactionSnapshot[],
      orm.proration,
      orm.initialCash,
      orm.incomes,
      orm.expenses,
      orm.finalCash,
      orm.period,
      orm.createdAt,
    );
  }
  toOrm(domain: Settlement): Partial<SettlementOrmEntity> {
    return {
      id: domain.id,
      consortiumId: domain.consortiumId,
      transactions: domain.transactions,
      proration: domain.proration,
      initialCash: domain.initialCash,
      incomes: domain.incomes,
      expenses: domain.expenses,
      finalCash: domain.finalCash,
      period: domain.period,
      createdAt: domain.createdAt,
    };
  }
}
