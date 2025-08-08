import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { Unit } from '../domain/entities/unit.entity';
import { UnitExistsException } from '../domain/exceptions/unit-exists.exception';
import { IUnitRepository } from '../domain/interfaces/repository.interface';
import { IUnit } from '../domain/interfaces/unit.interface';
import { UnitRepositoryMapper } from './unit.mapper';
import { UnitOrmSchema } from './unit.schema';

@Injectable()
export class UnitRepository implements IUnitRepository {
  constructor(
    private readonly dataSource: DataSource,
    private readonly mapper: UnitRepositoryMapper,
  ) {}

  async create(unit: Unit): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const isUnitExists = await manager
        .createQueryBuilder(UnitOrmSchema, 'unit')
        .where('unit.consortiumId = :consortiumId', {
          consortiumId: unit.consortiumId,
        })
        .andWhere('unit.floor = :floor', { floor: unit.floor })
        .andWhere('unit.division = :division', { division: unit.division })
        .setLock('pessimistic_write')
        .getOne();

      if (isUnitExists) {
        throw new UnitExistsException({
          floor: unit.floor,
          division: unit.division,
        });
      }

      await manager.save(UnitOrmSchema, unit);
    });
  }

  async listByConsortiumId(consortiumId: string): Promise<IUnit[]> {
    const rows = await this.dataSource
      .getRepository(UnitOrmSchema)
      .createQueryBuilder('u')
      .where('u.consortiumId = :consortiumId', { consortiumId })
      .orderBy('u.floor', 'ASC')
      .addOrderBy('u.division', 'ASC')
      .getMany();

    return this.mapper.toDomainArray(rows);
  }
}
