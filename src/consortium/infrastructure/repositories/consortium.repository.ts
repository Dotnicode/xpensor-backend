import { Injectable } from '@nestjs/common';
import { IConsortiumRepository } from 'src/consortium/domain/consortium-repository.interface';
import { Consortium } from 'src/consortium/domain/consortium.entity';
import { DataSource } from 'typeorm';
import {
  ConsortiumOrmEntity,
  ConsortiumOrmSchema,
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
      raw.ownerId,
    );
  }

  async save(consortium: Consortium): Promise<void> {
    await this.dataSource
      .getRepository(ConsortiumOrmSchema)
      .createQueryBuilder()
      .insert()
      .into('consortiums')
      .values({
        id: consortium.id,
        name: consortium.name,
        taxId: consortium.taxId,
        address: consortium.address,
        ownerId: consortium.ownerId,
      })
      .execute();
  }

  async findAll(): Promise<Consortium[]> {
    const rows = await this.dataSource
      .getRepository<ConsortiumOrmEntity>('Consortium')
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.ownerId', 'owner')
      .select([
        'c.id',
        'c.name',
        'c.taxId',
        'c.address',
        'c.ownerId',
        'owner.id',
        'owner.email',
      ])
      .getMany();

    return rows.map((row) => this.toDomain(row));
  }

  async findAllByOwnerId(ownerId: string): Promise<Consortium[]> {
    const rows = await this.dataSource
      .getRepository<ConsortiumOrmEntity>('Consortium')
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.ownerId', 'owner')
      .select([
        'c.id',
        'c.name',
        'c.taxId',
        'c.address',
        'c.ownerId',
        'owner.id',
        'owner.email',
      ])
      .where('c.ownerId = :ownerId', { ownerId })
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
