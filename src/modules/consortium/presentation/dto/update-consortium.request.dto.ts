import {
    IsNotEmpty, IsNumberString, IsOptional, IsString, Length, MinLength
} from 'class-validator';

export class UpdateConsortiumRequestDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  name: string;

  @IsNumberString()
  @Length(11, 11, { message: 'TaxID (CUIL) must be 11 digits' })
  @IsOptional()
  taxId: string;

  @IsString()
  @IsOptional()
  address: string;
}
