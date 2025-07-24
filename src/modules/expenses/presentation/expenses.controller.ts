import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseDatePipe,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { FindExpensesByMonthUseCase } from '../application/find-by-month.usecase';
import { CreateExpenseUseCase } from '../application/create-expense.usecase';
import { CreateExpenseRequestDto } from './dto/create-expense-request.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(
    private readonly createExpense: CreateExpenseUseCase,
    private readonly findExpensesByMonthUseCase: FindExpensesByMonthUseCase,
  ) {}

  @Post(':consortiumId')
  async create(
    @Param('consortiumId', ParseUUIDPipe) consortiumId: string,
    @Body() createExpenseDto: CreateExpenseRequestDto,
  ) {
    await this.createExpense.execute({
      ...createExpenseDto,
      consortiumId,
    });

    return {
      message: 'Expense created successfully',
    };
  }

  @Get(':consortiumId')
  async findByMonth(
    @Param('consortiumId', ParseUUIDPipe) consortiumId: string,
    @Query('date', new ParseDatePipe()) date: Date,
  ) {
    try {
      return this.findExpensesByMonthUseCase.execute(date, consortiumId);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
