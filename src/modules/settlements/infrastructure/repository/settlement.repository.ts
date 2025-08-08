import { Injectable } from '@nestjs/common';
import { Period } from 'src/shared/types/period.type';
import { UnitProration } from 'src/shared/types/unit-proration.type';
import { DataSource } from 'typeorm';
import { Settlement } from '../../domain/entities/settlement.entity';
import { ISettlementRepository } from '../../domain/interfaces/repository.interface';
import { TransactionSnapshot } from '../../domain/types/transaction-snapshot.type';
import { SettlementRepositoryMapper } from './repository.mapper';
import { SettlementOrmSchema } from './settlement.schema';

@Injectable()
export class SettlementRepository implements ISettlementRepository {
  constructor(
    private readonly dataSource: DataSource,
    private readonly mapper: SettlementRepositoryMapper,
  ) {}

  async create(
    consortiumId: string,
    transactions: TransactionSnapshot[],
    proration: UnitProration[],
    initialCash: number,
    incomes: number,
    expenses: number,
    finalCash: number,
    period: Period,
  ): Promise<Settlement> {
    const settlement = await this.dataSource
      .getRepository(SettlementOrmSchema)
      .save({
        consortiumId,
        transactions,
        proration,
        initialCash,
        incomes,
        expenses,
        finalCash,
        period,
      });

    return this.mapper.toDomain(settlement);
  }

  async listByConsortiumId(consortiumId: string): Promise<Settlement[]> {
    const settlements = await this.dataSource
      .getRepository(SettlementOrmSchema)
      .findBy({
        consortiumId,
      });

    return settlements.map((settlement) => this.mapper.toDomain(settlement));
  }

  async findByPeriod(
    consortiumId: string,
    period: Period,
  ): Promise<Settlement | null> {
    const settlement = await this.dataSource
      .getRepository(SettlementOrmSchema)
      .findOneBy({
        consortiumId,
        period,
      });

    return settlement ? this.mapper.toDomain(settlement) : null;
  }

  async findById(settlementId: string): Promise<Settlement | null> {
    const settlement = await this.dataSource
      .getRepository(SettlementOrmSchema)
      .findOneBy({
        id: settlementId,
      });

    return settlement ? this.mapper.toDomain(settlement) : null;
  }
}
