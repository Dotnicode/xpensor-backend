import { Injectable } from '@nestjs/common';
import { ExpenseEntity } from '../domain/expense.entity';
import { IExpenseRepository } from '../domain/expense-repository.interface';
import { DataSource } from 'typeorm';
import { ExpenseOrmSchema } from './expense.schema';

@Injectable()
export class ExpenseRepository implements IExpenseRepository {
  constructor(private readonly dataSource: DataSource) {}

  private toDomain(raw: ExpenseEntity) {
    return new ExpenseEntity(
      raw.id,
      raw.description,
      raw.amount,
      raw.date,
      raw.category,
      raw.consortiumId,
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
    const rows = await this.dataSource
      .getRepository(ExpenseOrmSchema)
      .createQueryBuilder('expense')
      .where('expense.date >= :startDate', {
        startDate: new Date(date.getFullYear(), date.getMonth(), 1),
      })
      .andWhere('expense.date < :endDate', {
        endDate: new Date(date.getFullYear(), date.getMonth() + 1, 1),
      })
      .andWhere('expense.consortiumId = :consortiumId', {
        consortiumId,
      })
      .getMany();

    return rows.map((row) => this.toDomain(row));
  }
}
