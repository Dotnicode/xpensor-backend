import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConsortiumModule } from './consortium/consortium.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/infrastructure/entities/*.schema.{ts,js}'],
      synchronize: true,
    }),
    AuthModule,
    ConsortiumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
