import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ConsortiumNotExistsException } from '../../../shared/exceptions/consortium-not-exists.exception';
import { SettlementPeriodClosedException } from '../application/exceptions/period-closed.exception';
import { CloseSettlementPeriodUseCase } from '../application/use-cases/close-period.usecase';
import { ListSettlementUseCase } from '../application/use-cases/list.usecase';
import { PreviewCurrentPeriodPeriodUseCase } from '../application/use-cases/preview-current-period.usecase';
import { GenerateSettlementReportUseCase } from '../application/use-cases/report.usecase';
import { CloseSettlementRequestDto } from './dto/close.request.dto';
import { FindSettlementByPeriodRequestDto } from './dto/find-by-period.request.dto';
import { ReportSettlementRequestDto } from './dto/report.request.dto';
import { NotCurrentPeriodException } from '../application/exceptions/not-current-period.exception';

@UseGuards(AuthGuard('jwt'))
@Controller('settlements')
export class SettlementController {
  constructor(
    private readonly findByPeriodSettlementUseCase: PreviewCurrentPeriodPeriodUseCase,
    private readonly closeSettlementUseCase: CloseSettlementPeriodUseCase,
    private readonly listSettlementUseCase: ListSettlementUseCase,
    private readonly generateSettlementReportUseCase: GenerateSettlementReportUseCase,
  ) {}

  @Post('close-period')
  async closeSettlementPeriod(@Query() query: CloseSettlementRequestDto) {
    try {
      return await this.closeSettlementUseCase.execute({
        consortiumId: query.consortiumId,
        period: query.period,
      });
    } catch (error) {
      if (
        error instanceof SettlementPeriodClosedException ||
        error instanceof ConsortiumNotExistsException ||
        error instanceof NotCurrentPeriodException 
      ) {
        throw new BadRequestException(error.message);
      }

      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }
  
  @Get()
  async listSettlementsByConsortiumId(@Query('consortiumId') consortiumId: string) {
    return this.listSettlementUseCase.execute(consortiumId);
  }
  
  @Get('preview-current-period')
  async previewCurrentPeriod(@Query() query: FindSettlementByPeriodRequestDto) {
    try {
      return await this.findByPeriodSettlementUseCase.execute({
        consortiumId: query.consortiumId,
        period: query.period,
      });
    } catch (error) {
      if (
        error instanceof SettlementPeriodClosedException ||
        error instanceof ConsortiumNotExistsException || 
        error instanceof NotCurrentPeriodException
      ) {
        throw new BadRequestException(error.message);
      }
      
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Get('report')
  async generateSettlementReport(
    @Query() query: ReportSettlementRequestDto,
    @Res() response: Response,
  ) {
    response.setHeader('Content-Type', 'application/pdf');

    const pdf = await this.generateSettlementReportUseCase.execute(query.settlementId);

    return response.send(pdf);
  }
}
