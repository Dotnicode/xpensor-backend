import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
