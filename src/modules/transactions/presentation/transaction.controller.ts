import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransactionOutputDto } from '../application/dto/transaction.dto';
import { CreateTransactionUseCase } from '../application/use-cases/create-transaction.usecase';
import { ListTransactionsByPeriodUseCase } from '../application/use-cases/list-by-period.usecase';
import { CreateTransactionRequestDto } from './dto/create-transaction.request.dto';
import { ListTransactionByPeriodRequestDto } from './dto/list-transaction-by-period.request.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly listTransactionByPeriodUseCase: ListTransactionsByPeriodUseCase,
  ) {}

  @Post()
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionRequestDto,
  ): Promise<TransactionOutputDto> {
    return await this.createTransactionUseCase.execute(createTransactionDto);
  }

  @Get()
  async listTransactionsByPeriod(
    @Query() query: ListTransactionByPeriodRequestDto,
  ): Promise<TransactionOutputDto[]> {
    return await this.listTransactionByPeriodUseCase.execute(
      query.period,
      query.consortiumId,
    );
  }
}
