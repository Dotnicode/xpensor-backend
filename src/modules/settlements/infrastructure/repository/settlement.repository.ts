import { Injectable } from '@nestjs/common';
import { UnitProration } from 'src/shared/types/unit-proration.type';
import { PeriodString } from 'src/shared/value-objects/period.vo';
import { DataSource, QueryFailedError } from 'typeorm';
import { Settlement } from '../../domain/entities/settlement.entity';
import { ISettlementRepository } from '../../domain/interfaces/repository.interface';
import { TransactionSnapshot } from '../../domain/types/transaction-snapshot.type';
import { SettlementRepositoryMapper } from './repository.mapper';
import { SettlementOrmEntity, SettlementOrmSchema } from './settlement.schema';
import { SettlementPeriodClosedException } from '../../application/exceptions/period-closed.exception';

@Injectable()
export class SettlementRepository implements ISettlementRepository {
  constructor(
    private readonly dataSource: DataSource,
    private readonly mapper: SettlementRepositoryMapper,
  ) {}

  async createWithCheck(
    consortiumId: string,
    transactions: TransactionSnapshot[],
    proration: UnitProration[],
    initialCash_cents: number,
    incomes_cents: number,
    expenses_cents: number,
    finalCash_cents: number,
    period: PeriodString,
  ): Promise<Settlement> {
    return this.dataSource.transaction(async (manager) => {
      const repo = manager.getRepository(SettlementOrmSchema);

      const res = await repo
        .createQueryBuilder()
        .insert()
        .values({
          consortiumId,
          transactions,
          proration,
          initialCash_cents,
          incomes_cents,
          expenses_cents,
          finalCash_cents,
          period,
        })
        .orIgnore()
        .returning('*')
        .execute();

      const insertedRows = res.raw as SettlementOrmEntity[];

      if (!Array.isArray(insertedRows) || insertedRows.length === 0) {
        throw new SettlementPeriodClosedException(period);
      }

      return this.mapper.toDomain(insertedRows[0]);
    });
  }

  async listByConsortiumId(consortiumId: string): Promise<Settlement[]> {
    const settlements = await this.dataSource.getRepository(SettlementOrmSchema).findBy({
      consortiumId,
    });

    return settlements.map((settlement) => this.mapper.toDomain(settlement));
  }

  async findByPeriod(consortiumId: string, period: PeriodString): Promise<Settlement | null> {
    const settlement = await this.dataSource.getRepository(SettlementOrmSchema).findOneBy({
      consortiumId,
      period,
    });

    return settlement ? this.mapper.toDomain(settlement) : null;
  }

  async findById(settlementId: string): Promise<Settlement | null> {
    const settlement = await this.dataSource.getRepository(SettlementOrmSchema).findOneBy({
      id: settlementId,
    });

    return settlement ? this.mapper.toDomain(settlement) : null;
  }
}
