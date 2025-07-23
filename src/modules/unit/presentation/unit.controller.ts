import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUnitUseCase } from '../application/use-cases/create-unit.usecase';
import { UnitLabelInvalidError } from '../domain/exceptions/unit-label.exception';
import { CreateUnitRequestDto } from './dto/create-unit.request.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('units')
export class UnitController {
  constructor(private readonly createUnitUseCase: CreateUnitUseCase) {}

  @Post()
  async createUnit(@Body() createUnitRequestDto: CreateUnitRequestDto) {
    try {
      await this.createUnitUseCase.execute(createUnitRequestDto);
      return {
        message: `Unit ${createUnitRequestDto.label} created succesfully`,
      };
    } catch (error) {
      if (error instanceof UnitLabelInvalidError) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }
  }
}
