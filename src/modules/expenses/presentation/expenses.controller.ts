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
import { CreateExpenseUseCase } from '../application/create-expense.usecase';
import { FindExpensesByMonthUseCase } from '../application/find-by-month.usecase';
import { CreateExpenseRequestDto } from './dto/create-expense-request.dto';
import { ConsortiumNotExistsException } from '../domain/exceptions/consortium-not-exists.exception';
import { NotFoundError } from 'rxjs';

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
    try {
      await this.createExpense.execute({
        ...createExpenseDto,
        consortiumId,
      });

      return {
        message: 'Expense created successfully',
      };
    } catch (error) {
      if (error instanceof ConsortiumNotExistsException) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @Get(':consortiumId')
  async findByMonth(
    @Query('date', new ParseDatePipe()) date: Date,
    @Param('consortiumId', ParseUUIDPipe) consortiumId: string,
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
