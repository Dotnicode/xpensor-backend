import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { UnitExistsException } from '../domain/exceptions/unit-exists.exception';
import { IUnitRepository } from '../domain/unit-repository.interface';
import { UnitEntity } from '../domain/unit.entity';
import { UnitOrmEntity, UnitOrmSchema } from './unit.schema';

@Injectable()
export class UnitRepository implements IUnitRepository {
  constructor(private readonly dataSource: DataSource) {}

  private toDomain(raw: UnitOrmEntity): UnitEntity {
    return new UnitEntity(
      raw.id,
      raw.consortiumId,
      raw.floor,
      raw.apartment,
      raw.percentage,
    );
  }

  async create(unit: UnitEntity): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const isUnitExists = await manager
        .createQueryBuilder(UnitOrmSchema, 'unit')
        .where('unit.consortiumId = :consortiumId', {
          consortiumId: unit.consortiumId,
        })
        .andWhere('unit.floor = :floor', { floor: unit.floor })
        .andWhere('unit.apartment = :apartment', { apartment: unit.apartment })
        .setLock('pessimistic_write')
        .getOne();

      if (isUnitExists) {
        throw new UnitExistsException({
          floor: unit.floor,
          apartment: unit.apartment,
        });
      }

      await manager.save(UnitOrmSchema, unit);
    });
  }

  async findAllByConsortiumId(consortiumId: string): Promise<UnitEntity[]> {
    const rows = await this.dataSource
      .getRepository(UnitOrmSchema)
      .createQueryBuilder('u')
      .where('u.consortiumId = :consortiumId', { consortiumId })
      .orderBy('u.floor', 'ASC')
      .addOrderBy('u.apartment', 'ASC')
      .getMany();

    return rows.map((row) => this.toDomain(row));
  }
}
