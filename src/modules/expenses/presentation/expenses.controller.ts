import {
  BadRequestException,
  Body,
  Controller,
  Get,
  ParseDatePipe,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateExpenseUseCase } from '../application/create-expense.usecase';
import { FindExpensesByMonthUseCase } from '../application/find-by-month.usecase';
import { ConsortiumNotExistsException } from '../domain/exceptions/consortium-not-exists.exception';
import { CreateExpenseRequestDto } from './dto/create-expense-request.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(
    private readonly createExpense: CreateExpenseUseCase,
    private readonly findExpensesByMonthUseCase: FindExpensesByMonthUseCase,
  ) {}

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseRequestDto) {
    try {
      await this.createExpense.execute(createExpenseDto);

      return {
        message: 'Expense created successfully',
      };
    } catch (error) {
      if (error instanceof ConsortiumNotExistsException) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @Get()
  async findByMonth(
    @Query('date', new ParseDatePipe()) date: Date,
    @Query('consortiumId', ParseUUIDPipe) consortiumId: string,
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
