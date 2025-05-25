import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConsortiumModule } from './consortium/consortium.module';
import { ConsortiumOrmSchema } from './consortium/infrastructure/entities/consortium.schema';
import { UserOrmSchema } from './auth/infrastructure/entities/user.orm-schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [UserOrmSchema, ConsortiumOrmSchema],
      synchronize: true,
    }),
    AuthModule,
    ConsortiumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
