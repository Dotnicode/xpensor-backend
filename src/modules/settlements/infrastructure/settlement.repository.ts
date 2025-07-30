import { Injectable } from '@nestjs/common';
import { IConsortium } from 'src/shared/interfaces/consortium.interface';
import { YearMonth } from 'src/shared/types/year-month.type';
import { DataSource } from 'typeorm';
import { SettlementEntity } from '../domain/settlement.entity';
import { ISettlementRepository } from '../domain/settlement.repository.interface';
import { SettlementOrmEntity, SettlementOrmSchema } from './settlement.schema';

@Injectable()
export class SettlementRepository implements ISettlementRepository {
  constructor(private readonly dataSource: DataSource) {}

  async save(
    consortiumId: string,
    amount: number,
    period: YearMonth,
  ): Promise<SettlementEntity> {
    const settlement = await this.dataSource.transaction(async (manager) => {
      const existingSettlement = await manager.findOne(SettlementOrmSchema, {
        where: {
          consortiumId,
          period,
        },
      });

      let settlement: SettlementOrmEntity;

      if (existingSettlement) {
        existingSettlement.amount = amount;
        settlement = await manager.save(existingSettlement);
      } else {
        settlement = await manager.save(SettlementOrmSchema, {
          consortiumId,
          amount,
          period,
        });
      }
    });

    return new SettlementEntity(
      settlement.id,
      settlement.consortiumId,
      settlement.amount,
      settlement.period.substring(0, 7) as YearMonth,
      settlement.createdAt,
    );
  }

  exportPdf(consortium: IConsortium, date: Date): Promise<Buffer> {
    throw new Error('Method not implemented.');
  }
}
