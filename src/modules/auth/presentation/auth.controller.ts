import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserRequestDto } from './dto/login-user.request.dto';
import { RegisterUserRequestDto } from './dto/register-user.request.dto';
import { LoginUserUseCase } from '../application/use-cases/login-user.usecase';
import { RegisterUserUseCase } from '../application/use-cases/register-user.usecase';

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
      return await this.loginUserUseCase.execute(loginUserRequestDto);
    } catch (error: unknown) {
      if (error instanceof UnauthorizedException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
}