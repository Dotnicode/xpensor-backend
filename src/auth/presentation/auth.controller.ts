import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('register')
  register(@Body() body: any) {
    return 'register';
  }

  @Post('login')
  login(@Body() body: any) {
    return 'login';
  }
}
