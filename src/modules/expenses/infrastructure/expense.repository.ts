import { Injectable } from '@nestjs/common';
import { Between, DataSource } from 'typeorm';
import { IExpenseRepository } from '../domain/expense-repository.interface';
import { ExpenseEntity } from '../domain/expense.entity';
import { ExpenseOrmEntity, ExpenseOrmSchema } from './expense.schema';

@Injectable()
export class ExpenseRepository implements IExpenseRepository {
  constructor(private readonly dataSource: DataSource) {}

  private toDomain(orm: ExpenseOrmEntity): ExpenseEntity {
    return new ExpenseEntity(
      orm.id,
      orm.consortiumId,
      orm.description,
      orm.type,
      orm.category,
      orm.amount,
      new Date(orm.date),
      orm.isProrated,
    );
  }

  async create(expense: ExpenseEntity): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      await manager.save(ExpenseOrmSchema, expense);
    });
  }

  async findByMonth(
    date: Date,
    consortiumId: string,
  ): Promise<ExpenseEntity[]> {
    const targetDate = date instanceof Date ? date : new Date(date);

    const startOfMonth = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      1,
    );
    const startOfNextMonth = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth() + 1,
      1,
    );

    const expenses = await this.dataSource
      .getRepository(ExpenseOrmSchema)
      .find({
        where: {
          date: Between(startOfMonth, startOfNextMonth),
          consortiumId,
        },
      });

    return expenses.map((row) => this.toDomain(row));
  }
}
