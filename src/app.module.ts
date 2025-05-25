import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserOrmSchema } from './auth/infrastructure/entities/user.orm-schema';
import { ConsortiumModule } from './consortium/consortium.module';
import { ConsortiumOrmSchema } from './consortium/infrastructure/entities/consortium.schema';
import { UnitOrmSchema } from './unit/infrastructure/entities/unit.schema';
import { UnitModule } from './unit/unit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [UserOrmSchema, ConsortiumOrmSchema, UnitOrmSchema],
      synchronize: true,
    }),
    AuthModule,
    ConsortiumModule,
    UnitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
