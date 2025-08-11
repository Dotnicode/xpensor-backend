import { RepositoryBaseMapper } from 'src/shared/utils/repository-base-mapper.util';
import { Settlement } from '../../domain/entities/settlement.entity';
import { TransactionSnapshot } from '../../domain/types/transaction-snapshot.type';
import { SettlementOrmEntity } from './settlement.schema';
import { Money } from 'src/shared/value-objects/money.vo';
import { PeriodString } from 'src/shared/value-objects/period.vo';

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
      Money.fromCents(orm.initialCash_cents),
      Money.fromCents(orm.incomes_cents),
      Money.fromCents(orm.expenses_cents),
      Money.fromCents(orm.finalCash_cents),
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
      initialCash_cents: domain.initialCash.cents,
      incomes_cents: domain.incomes.cents,
      expenses_cents: domain.expenses.cents,
      finalCash_cents: domain.finalCash.cents,
      period: domain.period,
      createdAt: domain.createdAt,
    };
  }
}
