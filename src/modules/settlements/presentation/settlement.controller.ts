import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PreviewSettlementUseCase } from '../application/use-cases/preview.usecase';
import { PreviewSettlementRequestDto } from './dto/preview.request.dto';
import { CloseSettlementException } from '../application/exceptions/close.exception';
import { ConsortiumNotExistsException } from '../application/exceptions/consortium-not-exists.exception';

@UseGuards(AuthGuard('jwt'))
@Controller('settlements')
export class SettlementController {
  constructor(
    private readonly previewSettlementUseCase: PreviewSettlementUseCase,
  ) {}

  @Get('preview')
  async preview(@Query() query: PreviewSettlementRequestDto) {
    try {
      return await this.previewSettlementUseCase.execute({
        consortiumId: query.consortiumId,
        period: query.period,
      });
    } catch (error) {
      if (
        error instanceof CloseSettlementException ||
        error instanceof ConsortiumNotExistsException
      ) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException(error);
    }
  }
}
