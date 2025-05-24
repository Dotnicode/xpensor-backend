import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserUseCase } from '../application/use-cases/register-user.usecase';
import { RegisterUserDto } from '../application/dto/register-user.dto';
import { LoginUserUseCase } from '../application/use-cases/login-user.usecase';
import { LoginUserDto } from '../application/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterUserDto) {
    try {
      await this.registerUserUseCase.execute(body.email, body.password);
      return { message: 'User registered successfully' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  @Post('login')
  async login(@Body() body: LoginUserDto) {
    try {
      const { token } = await this.loginUserUseCase.execute(
        body.email,
        body.password,
      );

      return { token };
    } catch (error: unknown) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
}
