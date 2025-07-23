import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/auth/domain/user.entity';
import { UserRepository } from 'src/modules/auth/infrastructure/repositories/user.repository';
import { v4 as uuidv4 } from 'uuid';

import { BadRequestException } from '@nestjs/common';
import { RegisterUserInputDTO } from './dto/register-user.input.dto';

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(registerUserInputDto: RegisterUserInputDTO): Promise<void> {
    const userExists = await this.userRepository.findByEmail(
      registerUserInputDto.email,
    );
    if (userExists) throw new BadRequestException('User already exists');

    const passwordHash = await bcrypt.hash(registerUserInputDto.password, 10);
    const user = new User(uuidv4(), registerUserInputDto.email, passwordHash);

    await this.userRepository.save(user);
  }
}
