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
    const savedSettlement = await this.dataSource.transaction(
      async (manager) => {
        const existingSettlement = await manager.findOne(SettlementOrmSchema, {
          where: {
            consortiumId,
            period,
          },
        });

        let settlementToSave: SettlementOrmEntity;

        if (existingSettlement) {
          existingSettlement.amount = amount;
          settlementToSave = await manager.save(
            SettlementOrmSchema,
            existingSettlement,
          );
        } else {
          settlementToSave = await manager.save(SettlementOrmSchema, {
            consortiumId,
            amount,
            period,
          });
        }

        return settlementToSave;
      },
    );

    return new SettlementEntity(
      savedSettlement.id,
      savedSettlement.consortiumId,
      savedSettlement.amount,
      savedSettlement.period as YearMonth,
      savedSettlement.createdAt,
    );
  }

  exportPdf(consortium: IConsortium, date: Date): Promise<Buffer> {
    throw new Error('Method not implemented.');
  }
}
