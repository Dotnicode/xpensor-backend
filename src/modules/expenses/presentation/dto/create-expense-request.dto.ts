import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ExpenseType } from '../../domain/enums/expense-type.enum';

export class CreateExpenseRequestDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(ExpenseType)
  type: ExpenseType;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsDate()
  @Transform(({ value }: { value: string }) => new Date(value))
  date: Date;

  @IsBoolean()
  isProrated: boolean;
}
