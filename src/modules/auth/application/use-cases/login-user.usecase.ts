import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/modules/auth/infrastructure/repositories/user.repository';

import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInputDto } from './dto/login-user.input.dto';

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    loginUserInputDto: LoginUserInputDto,
  ): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(loginUserInputDto.email);
    if (!user) throw new BadRequestException('User not found');

    const isPasswordValid = await bcrypt.compare(
      loginUserInputDto.password,
      user.password,
    );
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    try {
      const token = await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      });
      return { token };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
