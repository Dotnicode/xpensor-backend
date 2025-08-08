import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { TransactionSource } from 'src/shared/enums/transaction-source.enum';
import { TransactionType } from 'src/shared/enums/transaction-type.enum';
import { Period } from 'src/shared/types/period.type';
import { TransactionInputDto } from '../../application/dto/transaction.dto';

export class CreateTransactionRequestDto implements TransactionInputDto {
  @IsUUID()
  consortiumId: string;
  @IsUUID()
  @IsOptional()
  unitId?: string;
  @IsNumber()
  amount: number;
  @IsEnum(TransactionType)
  type: TransactionType;
  @IsEnum(TransactionSource)
  source: TransactionSource;
  @IsString()
  description: string;
  @IsString()
  @Matches(/^(19\d{2}|20\d{2})-(0[1-9]|1[0-2])$/, {
    message:
      'Period must be in YYYY-MM format with valid year (1900-2099) and month (01-12)',
  })
  period: Period;
}
