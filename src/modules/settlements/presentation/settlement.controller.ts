import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { YearMonth } from 'src/shared/types/year-month.type';
import { CalculateSettlementUseCase } from '../application/calculate.usecase';
import { ConsortiumNotExistsException } from '../application/exceptions/consortium-not-exists.exception';

@UseGuards(AuthGuard('jwt'))
@Controller('settlements')
export class SettlementController {
  constructor(
    private readonly calculateSettlementUseCase: CalculateSettlementUseCase,
  ) {}

  @Get()
  async calculate(
    @Query('consortiumId') consortiumId: string,
    @Query('period') period: YearMonth,
  ) {
    try {
      return await this.calculateSettlementUseCase.execute({
        consortiumId,
        period,
      });
    } catch (error) {
      if (error instanceof ConsortiumNotExistsException) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException(error);
    }
  }
}
