import { Transform } from 'class-transformer';
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
  @IsUUID()
  consortiumId: string;

  @IsNumberString()
  @MinLength(1)
  floor: string;

  @IsAlphanumeric()
  @MinLength(1)
  @Transform(({ value }: { value: string }) => value.toUpperCase())
  apartment: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  percentage: number;
}
