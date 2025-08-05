import { Injectable } from '@nestjs/common';
import { UnitProration } from 'src/shared/types/unit-proration.type';
import { YearMonth } from 'src/shared/types/year-month.type';
import { DataSource } from 'typeorm';
import { SettlementEntity } from '../../domain/settlement.entity';
import { ISettlementRepository } from '../../domain/interfaces/repository.interface';
import { SettlementOrmEntity, SettlementOrmSchema } from './settlement.schema';

@Injectable()
export class SettlementRepository implements ISettlementRepository {
  constructor(private readonly dataSource: DataSource) {}

  private toDomain(settlement: SettlementOrmEntity): SettlementEntity {
    return new SettlementEntity(
      settlement.id,
      settlement.consortiumId,
      settlement.transactions,
      settlement.proration,
      settlement.initialCash,
      settlement.incomes,
      settlement.expenses,
      settlement.finalCash,
      settlement.period.substring(0, 7) as YearMonth,
      settlement.createdAt,
    );
  }

  async create(
    consortiumId: string,
    period: YearMonth,
    expenseIds: string[],
    summary: UnitProration[],
    total: number,
  ): Promise<SettlementEntity> {
    const result = await this.dataSource.manager.save(SettlementOrmSchema, {
      consortiumId,
      period,
      expenseIds,
      summary,
      total,
    });

    return this.toDomain(result);
  }

  async findById(settlementId: string): Promise<SettlementEntity | null> {
    const settlement = await this.dataSource.manager.findOne(
      SettlementOrmSchema,
      {
        where: { id: settlementId },
      },
    );

    return settlement ? this.toDomain(settlement) : null;
  }

  async findByPeriod(
    consortiumId: string,
    period: YearMonth,
  ): Promise<SettlementEntity | null> {
    const settlement = await this.dataSource.manager.findOne(
      SettlementOrmSchema,
      {
        where: { consortiumId, period },
      },
    );

    return settlement ? this.toDomain(settlement) : null;
  }

  async list(consortiumId: string): Promise<SettlementEntity[]> {
    const settlements = await this.dataSource.manager.findBy(
      SettlementOrmSchema,
      { consortiumId },
    );

    return settlements.map((settlement) => this.toDomain(settlement));
  }
}
