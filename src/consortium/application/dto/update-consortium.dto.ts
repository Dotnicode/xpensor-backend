import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class UpdateConsortiumDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsNumberString()
  @Length(11, 11, { message: 'TaxID (CUIL) must be 11 digits' })
  taxId: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
