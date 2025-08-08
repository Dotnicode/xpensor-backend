import {
  BadRequestException,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClosedSettlementException } from '../application/exceptions/closed-settlement.exception';
import { ConsortiumNotExistsException } from '../../../shared/exceptions/consortium-not-exists.exception';
import { CloseSettlementUseCase } from '../application/use-cases/close.usecase';
import { ListSettlementUseCase } from '../application/use-cases/list.usecase';
import { PreviewSettlementUseCase } from '../application/use-cases/preview.usecase';
import { CloseSettlementRequestDto } from './dto/close.request.dto';
import { PreviewSettlementRequestDto } from './dto/preview.request.dto';
import { ReportSettlementRequestDto } from './dto/report.request.dto';
import { GenerateSettlementReportUseCase } from '../application/use-cases/report.usecase';
import { Response } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('settlements')
export class SettlementController {
  constructor(
    private readonly previewSettlementUseCase: PreviewSettlementUseCase,
    private readonly closeSettlementUseCase: CloseSettlementUseCase,
    private readonly listSettlementUseCase: ListSettlementUseCase,
    private readonly generateSettlementReportUseCase: GenerateSettlementReportUseCase,
  ) {}

  @Post('close')
  closeCurrentSettlementPeriod(@Query() query: CloseSettlementRequestDto) {
    try {
      return 'Pending to implementation';
      // return await this.closeSettlementUseCase.execute({
      //   consortiumId: query.consortiumId,
      //   period: query.period,
      // });
    } catch (error) {
      if (
        error instanceof ClosedSettlementException ||
        error instanceof ConsortiumNotExistsException
      ) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  async listSettlementsByConsortiumId(
    @Query('consortiumId') consortiumId: string,
  ) {
    return this.listSettlementUseCase.execute(consortiumId);
  }

  @Get('preview')
  async previewPeriod(@Query() query: PreviewSettlementRequestDto) {
    try {
      return await this.previewSettlementUseCase.execute({
        consortiumId: query.consortiumId,
        period: query.period,
      });
    } catch (error) {
      if (
        error instanceof ClosedSettlementException ||
        error instanceof ConsortiumNotExistsException
      ) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException(error);
    }
  }

  @Get('report')
  async generateSettlementReport(
    @Query() query: ReportSettlementRequestDto,
    @Res() response: Response,
  ) {
    response.setHeader('Content-Type', 'application/pdf');

    const pdf = await this.generateSettlementReportUseCase.execute(
      query.settlementId,
    );

    return response.send(pdf);
  }
}
