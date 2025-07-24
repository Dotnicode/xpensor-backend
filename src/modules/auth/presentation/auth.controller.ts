import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { LoginUserUseCase } from '../application/use-cases/login-user.usecase';
import { RegisterUserUseCase } from '../application/use-cases/register-user.usecase';
import { RegisterUserRequestDto } from './dto/register-user.request.dto';
import { LoginUserRequestDto } from './dto/login-user.request.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post('register')
  async register(@Body() registerUserRequestDto: RegisterUserRequestDto) {
    try {
      await this.registerUserUseCase.execute(registerUserRequestDto);
      return { message: 'User registered successfully' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  @Post('login')
  async login(@Body() loginUserRequestDto: LoginUserRequestDto) {
    try {
      const { token } =
        await this.loginUserUseCase.execute(loginUserRequestDto);
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
