import { Module } from '@nestjs/common';
import { AuthJwtModule } from './infrastructure/jwt/jwt.module';
import { AuthController } from './presentation/auth.controller';
import { RegisterUserUseCase } from './application/use-cases/register-user.usecase';
import { LoginUserUseCase } from './application/use-cases/login-user.usecase';
import { UserRepository } from './infrastructure/repositories/user.repository';

@Module({
  imports: [AuthJwtModule],
  controllers: [AuthController],
  providers: [RegisterUserUseCase, LoginUserUseCase, UserRepository],
  exports: [UserRepository],
})
export class AuthModule {}
