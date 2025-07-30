import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { UserOrmSchema } from './modules/auth/infrastructure/entities/user.orm-schema';
import { ConsortiumModule } from './modules/consortium/consortium.module';
import { ConsortiumOrmSchema } from './modules/consortium/infrastructure/consortium.schema';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { ExpenseOrmSchema } from './modules/expenses/infrastructure/expense.schema';
import { UnitOrmSchema } from './modules/unit/infrastructure/unit.schema';
import { UnitModule } from './modules/unit/unit.module';
import { SettlementModule } from './modules/settlements/settlement.module';
import { SettlementOrmSchema } from './modules/settlements/infrastructure/settlement.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [
        UserOrmSchema,
        ConsortiumOrmSchema,
        UnitOrmSchema,
        ExpenseOrmSchema,
        SettlementOrmSchema,
      ],
      synchronize: true,
    }),
    AuthModule,
    ConsortiumModule,
    UnitModule,
    ExpensesModule,
    SettlementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
