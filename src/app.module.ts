import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { UserOrmSchema } from './modules/auth/infrastructure/entities/user.orm-schema';
import { ConsortiumModule } from './modules/consortiums/consortium.module';
import { ConsortiumOrmSchema } from './modules/consortiums/infrastructure/consortium.schema';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { ExpenseOrmSchema } from './modules/expenses/infrastructure/expense.schema';
import { SettlementOrmSchema } from './modules/settlements/infrastructure/repository/settlement.schema';
import { SettlementModule } from './modules/settlements/settlement.module';
import { UnitOrmSchema } from './modules/units/infrastructure/unit.schema';
import { UnitModule } from './modules/units/unit.module';

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
