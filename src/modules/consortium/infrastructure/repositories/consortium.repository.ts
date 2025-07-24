import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { IConsortiumRepository } from '../../domain/consortium-repository.interface';
import { Consortium } from '../../domain/consortium.entity';
import {
  ConsortiumOrmEntity,
  ConsortiumTypeOrmSchema,
} from '../entities/consortium.schema';

@Injectable()
export class ConsortiumRepository implements IConsortiumRepository {
  constructor(private readonly dataSource: DataSource) {}

  private toDomain(raw: ConsortiumOrmEntity): Consortium {
    return new Consortium(
      raw.id,
      raw.name,
      raw.taxId,
      raw.address,
      raw.administratorId,
    );
  }

  async save(consortium: Consortium): Promise<void> {
    await this.dataSource
      .getRepository(ConsortiumTypeOrmSchema)
      .createQueryBuilder()
      .insert()
      .into('consortiums')
      .values({
        id: consortium.id,
        name: consortium.name,
        taxId: consortium.taxId,
        address: consortium.address,
        administratorId: consortium.administratorId,
      })
      .execute();
  }

  async findAll(): Promise<Consortium[]> {
    const rows = await this.dataSource
      .getRepository<ConsortiumOrmEntity>('Consortium')
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.administratorId', 'owner')
      .select([
        'c.id',
        'c.name',
        'c.taxId',
        'c.address',
        'c.administratorId',
        'owner.id',
        'owner.email',
      ])
      .getMany();

    return rows.map((row) => this.toDomain(row));
  }

  async findAllByAdministratorId(
    administratorId: string,
  ): Promise<Consortium[]> {
    const rows = await this.dataSource
      .getRepository<ConsortiumOrmEntity>('Consortium')
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.administratorId', 'owner')
      .select([
        'c.id',
        'c.name',
        'c.taxId',
        'c.address',
        'c.administratorId',
        'owner.id',
        'owner.email',
      ])
      .where('c.administratorId = :administratorId', { administratorId })
      .getMany();

    return rows.map((row) => this.toDomain(row));
  }

  async findById(id: string): Promise<Consortium | null> {
    const row = await this.dataSource
      .getRepository<ConsortiumOrmEntity>('Consortium')
      .createQueryBuilder('c')
      .where('c.id = :id', { id })
      .getOne();

    return row ? this.toDomain(row) : null;
  }

  async update(consortium: Consortium): Promise<void> {
    await this.dataSource
      .getRepository<ConsortiumOrmEntity>('Consortium')
      .createQueryBuilder()
      .update()
      .set({
        name: consortium.name,
        taxId: consortium.taxId,
        address: consortium.address,
      })
      .where('id = :id', { id: consortium.id })
      .execute();
  }

  async delete(id: string): Promise<void> {
    await this.dataSource
      .getRepository<ConsortiumOrmEntity>('Consortium')
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
