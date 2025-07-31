import { Injectable } from '@nestjs/common';
import { UnitProration } from 'src/shared/types/unit-proration.type';
import { YearMonth } from 'src/shared/types/year-month.type';
import { DataSource } from 'typeorm';
import { SettlementEntity } from '../domain/settlement.entity';
import { ISettlementRepository } from '../domain/settlement.repository.interface';
import { SettlementOrmEntity, SettlementOrmSchema } from './settlement.schema';

@Injectable()
export class SettlementRepository implements ISettlementRepository {
  constructor(private readonly dataSource: DataSource) {}

  private toDomain(settlement: SettlementOrmEntity): SettlementEntity {
    return new SettlementEntity(
      settlement.id,
      settlement.consortiumId,
      settlement.period.substring(0, 7) as YearMonth,
      settlement.expenses,
      settlement.summary,
      settlement.total,
      settlement.createdAt,
      settlement.updatedAt,
    );
  }

  async create(
    consortiumId: string,
    period: YearMonth,
    expenses: string[],
    summary: UnitProration[],
    total: number,
  ): Promise<SettlementEntity | undefined> {
    try {
      const settlement = await this.dataSource.transaction(async (manager) => {
        const existing = await manager.findOne(SettlementOrmSchema, {
          where: { consortiumId, period },
        });

        if (existing) {
          throw new Error('Settlement already exists for this period');
        }

        return await manager.save(SettlementOrmSchema, {
          consortiumId,
          period,
          expenses,
          summary,
          total,
        });
      });

      return this.toDomain(settlement);
    } catch (error) {
      console.log(error);
    }
  }

  async find(
    consortiumId: string,
    period: YearMonth,
  ): Promise<SettlementEntity | null> {
    const settlement = await this.dataSource.manager.findOne(
      SettlementOrmSchema,
      {
        where: { consortiumId, period },
      },
    );

    if (!settlement) {
      return null;
    }

    return this.toDomain(settlement);
  }

  async update(
    consortiumId: string,
    period: YearMonth,
    expenses: string[],
    summary: UnitProration[],
    total: number,
  ): Promise<SettlementEntity> {
    const settlement = await this.dataSource.transaction(async (manager) => {
      const existing = await manager.findOne(SettlementOrmSchema, {
        where: { consortiumId, period },
      });

      if (!existing) {
        throw new Error('Settlement not found');
      }

      const result = await manager.update(
        SettlementOrmSchema,
        { id: existing.id },
        {
          expenses,
          summary,
          total,
          updatedAt: new Date(),
        },
      );

      return {
        ...existing,
        expenses,
        summary,
        total,
        updatedAt: new Date(),
      };
    });

    return this.toDomain(settlement);
  }
}
