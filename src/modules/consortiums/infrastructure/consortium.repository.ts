import { DataSource } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { IConsortiumRepository } from '../domain/consortium-repository.interface';
import { Consortium } from '../domain/consortium.entity';
import { ConsortiumOrmEntity, ConsortiumOrmSchema } from './consortium.schema';

@Injectable()
export class ConsortiumRepository implements IConsortiumRepository {
  constructor(private readonly dataSource: DataSource) {}

  private toDomain(raw: ConsortiumOrmEntity): Consortium {
    return new Consortium(raw.id, raw.name, raw.taxId, raw.address, raw.userId);
  }

  async create(consortium: Consortium): Promise<void> {
    await this.dataSource
      .getRepository(ConsortiumOrmSchema)
      .createQueryBuilder()
      .insert()
      .into(ConsortiumOrmSchema)
      .values({
        id: consortium.id,
        name: consortium.name,
        taxId: consortium.taxId,
        address: consortium.address,
        userId: consortium.userId,
      })
      .execute();
  }

  async findById(id: string): Promise<Consortium | null> {
    const raw = await this.dataSource
      .getRepository(ConsortiumOrmSchema)
      .findOneBy({ id });

    return raw ? this.toDomain(raw) : null;
  }

  async listByUserId(userId: string): Promise<Consortium[]> {
    const rows = await this.dataSource
      .getRepository<ConsortiumOrmEntity>('Consortium')
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.userId', 'owner')
      .select([
        'c.id',
        'c.name',
        'c.taxId',
        'c.address',
        'c.userId',
        'owner.id',
        'owner.email',
      ])
      .where('c.userId = :userId', { userId })
      .getMany();

    return rows.map((row) => this.toDomain(row));
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
