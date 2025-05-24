import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserUseCase } from '../application/use-cases/register-user.usecase';
import { RegisterUserDto } from '../application/dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post('register')
  async register(@Body() body: RegisterUserDto) {
    await this.registerUserUseCase.execute(body.email, body.password);
    return { message: 'User registered successfully' };
  }

  @Post('login')
  login(@Body() body: any) {
    return 'login';
  }
}
