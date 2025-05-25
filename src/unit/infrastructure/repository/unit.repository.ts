import { IUnitRepository } from 'src/unit/domain/unit-repository.interface';
import { UnitEntity } from 'src/unit/domain/unit.entity';
import { DataSource } from 'typeorm';
import { UnitOrmEntity, UnitOrmSchema } from '../entities/unit.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UnitRepository implements IUnitRepository {
  constructor(private readonly dataSource: DataSource) {}

  private toDomain(raw: UnitOrmEntity): UnitEntity {
    return new UnitEntity(
      raw.id,
      raw.floor,
      raw.label,
      raw.percentage,
      raw.consortiumId,
    );
  }

  async create(unit: UnitEntity): Promise<void> {
    await this.dataSource
      .getRepository(UnitOrmSchema)
      .createQueryBuilder()
      .insert()
      .into('units')
      .values({
        id: unit.id,
        floor: unit.floor,
        label: unit.label,
        percentage: unit.percentage,
        consortiumId: unit.consortiumId,
      })
      .execute();
  }

  async findAllByConsortiumId(consortiumId: string): Promise<UnitEntity[]> {
    const rows = await this.dataSource
      .getRepository(UnitOrmSchema)
      .createQueryBuilder('u')
      .where('u.consortiumId = :consortiumId', { consortiumId })
      .getMany();

    return rows.map((row) => this.toDomain(row));
  }

  async findOneById(id: string): Promise<UnitEntity | null> {
    const row = await this.dataSource
      .getRepository(UnitOrmSchema)
      .createQueryBuilder('u')
      .where('u.id = :id', { id })
      .getOne();
    return row ? this.toDomain(row) : null;
  }

  async update(unit: UnitEntity): Promise<void> {
    await this.dataSource
      .getRepository(UnitOrmSchema)
      .createQueryBuilder()
      .update()
      .set({
        floor: unit.floor,
        label: unit.label,
        percentage: unit.percentage,
      })
      .where('id = :id', { id: unit.id })
      .execute();
  }

  async delete(id: string): Promise<void> {
    await this.dataSource
      .getRepository(UnitOrmSchema)
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
