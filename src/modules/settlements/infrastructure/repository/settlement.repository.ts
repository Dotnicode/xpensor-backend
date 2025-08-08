import { Injectable } from '@nestjs/common';
import { UnitProration } from 'src/shared/types/unit-proration.type';
import { Period } from 'src/shared/types/period.type';
import { DataSource } from 'typeorm';
import { Settlement } from '../../domain/entities/settlement.entity';
import { ISettlementRepository } from '../../domain/interfaces/repository.interface';
import { SettlementOrmEntity, SettlementOrmSchema } from './settlement.schema';

@Injectable()
export class SettlementRepository implements ISettlementRepository {
  constructor(private readonly dataSource: DataSource) {}

  private toDomain(settlement: SettlementOrmEntity): Settlement {
    return new Settlement(
      settlement.id,
      settlement.consortiumId,
      settlement.transactions,
      settlement.proration,
      settlement.initialCash,
      settlement.incomes,
      settlement.expenses,
      settlement.finalCash,
      settlement.period.substring(0, 7) as Period,
      settlement.createdAt,
    );
  }

  async create(
    consortiumId: string,
    period: Period,
    expenseIds: string[],
    summary: UnitProration[],
    total: number,
  ): Promise<Settlement> {
    const result = await this.dataSource.manager.save(SettlementOrmSchema, {
      consortiumId,
      period,
      expenseIds,
      summary,
      total,
    });

    return this.toDomain(result);
  }

  async findById(settlementId: string): Promise<Settlement | null> {
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
    period: Period,
  ): Promise<Settlement | null> {
    const settlement = await this.dataSource.manager.findOne(
      SettlementOrmSchema,
      {
        where: { consortiumId, period },
      },
    );

    return settlement ? this.toDomain(settlement) : null;
  }

  async list(consortiumId: string): Promise<Settlement[]> {
    const settlements = await this.dataSource.manager.findBy(
      SettlementOrmSchema,
      { consortiumId },
    );

    return settlements.map((settlement) => this.toDomain(settlement));
  }
}
