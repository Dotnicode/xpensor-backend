import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('transactions')
export class TransactionController {
  @Post()
  createTransaction() {
    return 'Create a transaction';
  }

  @Get()
  listTransactionsByPeriod() {
    return 'List transactions by period';
  }
}
