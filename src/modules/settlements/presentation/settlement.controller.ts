import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CalculateSettlementUseCase } from '../application/calculate.usecase';
import { ConsortiumNotExistsException } from '../application/exceptions/consortium-not-exists.exception';
import { CalculateSettlementRequestDto } from './dto/calculate.request.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('settlements')
export class SettlementController {
  constructor(
    private readonly calculateSettlementUseCase: CalculateSettlementUseCase,
  ) {}

  @Get()
  async calculate(@Query() query: CalculateSettlementRequestDto) {
    try {
      return await this.calculateSettlementUseCase.execute({
        consortiumId: query.consortiumId,
        period: query.period,
      });
    } catch (error) {
      if (error instanceof ConsortiumNotExistsException) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error);
    }
  }
}
