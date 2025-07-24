import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { IUnitRepository } from '../../domain/unit-repository.interface';
import { UnitEntity } from '../../domain/unit.entity';
import { UnitOrmEntity, UnitOrmSchema } from '../entities/unit.schema';
import { UnitExistsException } from '../../domain/exceptions/unit-exists.exception';

@Injectable()
export class UnitRepository implements IUnitRepository {
  constructor(private readonly dataSource: DataSource) {}

  private toDomain(raw: UnitOrmEntity): UnitEntity {
    return new UnitEntity(
      raw.id,
      raw.floor,
      raw.apartment,
      raw.percentage,
      raw.consortiumId,
    );
  }

  async create(unit: UnitEntity): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const exists = await manager
        .createQueryBuilder(UnitOrmSchema, 'unit')
        .where('unit.consortiumId = :consortiumId', {
          consortiumId: unit.consortiumId,
        })
        .andWhere('unit.floor = :floor', { floor: unit.floor })
        .andWhere('unit.apartment = :apartment', { apartment: unit.apartment })
        .setLock('pessimistic_write')
        .getOne();

      if (exists) {
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
      .getMany();

    return rows.map((row) => this.toDomain(row));
  }
}
