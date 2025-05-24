import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/auth/domain/user.entity';
import { UserRepository } from 'src/auth/infrastructure/repositories/user.repository';
import { v4 as uuidv4 } from 'uuid';

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<void> {
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) throw new BadRequestException('User already exists');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User(uuidv4(), email, passwordHash);

    await this.userRepository.save(user);
  }
}
