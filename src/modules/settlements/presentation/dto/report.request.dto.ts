import { IsUUID } from 'class-validator';

export class ReportSettlementRequestDto {
  @IsUUID()
  settlementId: string;
}
