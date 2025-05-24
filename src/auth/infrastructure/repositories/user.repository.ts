import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/auth/domain/user-repository.interface';
import { User } from 'src/auth/domain/user.entity';
import { DataSource } from 'typeorm';
import { UserOrmEntity } from '../entities/user.orm-schema';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findByEmail(email: string): Promise<User | null> {
    const ormUser = await this.dataSource
      .getRepository<UserOrmEntity>('user')
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    if (!ormUser) return null;

    return new User(ormUser.id, ormUser.email, ormUser.password);
  }

  async save(user: User): Promise<void> {
    await this.dataSource
      .getRepository<UserOrmEntity>('user')
      .createQueryBuilder()
      .insert()
      .into('users')
      .values({ email: user.email, password: user.password })
      .execute();
  }
}
