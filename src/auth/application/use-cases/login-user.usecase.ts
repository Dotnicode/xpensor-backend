import { User } from '../../domain/user.entity';

export class LoginUserUseCase {
  execute(email: string, password: string): Promise<void> {
    throw new Error('Not implemented');
  }
}
