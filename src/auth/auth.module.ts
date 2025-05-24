import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginUserUseCase } from './application/use-cases/login-user.usecase';
import { RegisterUserUseCase } from './application/use-cases/register-user.usecase';
import { AuthJwtModule } from './infrastructure/jwt/jwt.module';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { AuthController } from './presentation/auth.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthJwtModule],
  controllers: [AuthController],
  providers: [
    UserRepository,
    {
      provide: RegisterUserUseCase,
      useFactory: (userRepository: UserRepository) =>
        new RegisterUserUseCase(userRepository),
      inject: [UserRepository],
    },
    {
      provide: LoginUserUseCase,
      useFactory: (userRepository: UserRepository, jwtService: JwtService) =>
        new LoginUserUseCase(userRepository, jwtService),
      inject: [UserRepository, JwtService],
    },
  ],
  exports: [UserRepository],
})
export class AuthModule {}
