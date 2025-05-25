import { IsString, Length, MinLength } from 'class-validator';

export class CreateConsortiumDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @Length(11, 11)
  taxId: string;

  @IsString()
  address: string;
}
