import {
  IsAlphanumeric,
  IsNumber,
  IsNumberString,
  IsUUID,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUnitRequestDto {
  @IsNumberString()
  @MinLength(1)
  floor: string;

  @IsAlphanumeric()
  @MinLength(1)
  label: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  percentage: number;

  @IsUUID()
  consortiumId: string;
}
