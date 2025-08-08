import { IsString, IsUUID } from 'class-validator';
import { Period } from 'src/shared/types/period.type';
import { IsPeriod } from 'src/shared/validators/period.validator';
import { PreviewSettlementInputDto } from '../../application/dto/preview.dto';

export class PreviewSettlementRequestDto implements PreviewSettlementInputDto {
  @IsUUID()
  consortiumId: string;

  @IsString()
  @IsPeriod()
  period: Period;
}
