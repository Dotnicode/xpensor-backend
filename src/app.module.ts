import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { UserOrmSchema } from './modules/auth/infrastructure/entities/user.orm-schema';
import { ConsortiumModule } from './modules/consortium/consortium.module';
import { ConsortiumTypeOrmSchema } from './modules/consortium/infrastructure/entities/consortium.schema';
import { UnitOrmSchema } from './modules/unit/infrastructure/entities/unit.schema';
import { UnitModule } from './modules/unit/unit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [UserOrmSchema, ConsortiumTypeOrmSchema, UnitOrmSchema],
      synchronize: true,
    }),
    AuthModule,
    ConsortiumModule,
    UnitModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
