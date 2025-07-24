import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateExpenseRequestDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsDate()
  @Transform(({ value }: { value: string }) => new Date(value))
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsOptional()
  category?: string;
}
