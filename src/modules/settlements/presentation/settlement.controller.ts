import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { PeriodString } from 'src/shared/value-objects/period.vo';
import { ConsortiumNotExistsException } from '../../../shared/exceptions/consortium-not-exists.exception';
import { SettlementPeriodClosedException } from '../application/exceptions/period-closed.exception';
import { CloseSettlementPeriodUseCase } from '../application/use-cases/close-period.usecase';
import { ListSettlementByConsortiumIdUseCase } from '../application/use-cases/list.usecase';
import { PreviewCurrentPeriodPeriodUseCase } from '../application/use-cases/preview-current-period.usecase';
import { GenerateSettlementReportUseCase } from '../application/use-cases/report.usecase';
import { CloseSettlementRequestDto } from './dto/close.request.dto';
import { FindSettlementByPeriodRequestDto } from './dto/find-by-period.request.dto';
import { ReportSettlementRequestDto } from './dto/report.request.dto';
import { NotCurrentPeriodException } from '../application/exceptions/not-current-period.exception';
import { FindSettlementByPeriodUseCase } from '../application/use-cases/find-by-period.use';

@UseGuards(AuthGuard('jwt'))
@Controller('settlements')
export class SettlementController {
  constructor(
    private readonly findSettlementByPeriodUseCase: FindSettlementByPeriodUseCase,
    private readonly previewCurrentPeriodUseCase: PreviewCurrentPeriodPeriodUseCase,
    private readonly closeSettlementUseCase: CloseSettlementPeriodUseCase,
    private readonly listSettlementByConsortiumIdUseCase: ListSettlementByConsortiumIdUseCase,
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

  @Get('preview-current-period')
  async previewCurrentPeriod(@Query() query: FindSettlementByPeriodRequestDto) {
    try {
      return await this.previewCurrentPeriodUseCase.execute({
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

  @Get(':consortiumId')
  async listSettlements(@Param('consortiumId') consortiumId: string) {
    return this.listSettlementByConsortiumIdUseCase.execute(consortiumId);
  }

  @Get(':consortiumId/:period')
  async findByPeriod(@Param('period') period: string, @Param('consortiumId') consortiumId: string) {
    try {
      const result = await this.findSettlementByPeriodUseCase.execute(consortiumId, period as PeriodString);
      
      if (!result) {
        throw new NotFoundException(`Settlement not found for consortium ${consortiumId} and period ${period}`);
      }
      
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
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
