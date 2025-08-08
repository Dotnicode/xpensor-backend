import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransactionOutputDto } from '../application/dto/transaction.dto';
import { CreateTransactionUseCase } from '../application/use-cases/create-transaction.usecase';
import { CreateTransactionRequestDto } from './dto/create-transaction.request.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
  ) {}

  @Post()
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionRequestDto,
  ): Promise<TransactionOutputDto> {
    return await this.createTransactionUseCase.execute(createTransactionDto);
  }

  @Get()
  listTransactionsByPeriod() {
    return 'List transactions by period';
  }
}
