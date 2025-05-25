import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUnitUseCase } from '../application/use-cases/create-unit.usecase';
import { CreateUnitDto } from '../application/dto/create-unit.dto';
import { UnitLabelInvalidError } from '../domain/exceptions/unit-label.exception';

@UseGuards(AuthGuard('jwt'))
@Controller('units')
export class UnitController {
  constructor(private readonly createUnitUseCase: CreateUnitUseCase) {}

  @Post()
  async createUnit(@Body() createUnitDto: CreateUnitDto) {
    try {
      await this.createUnitUseCase.execute(
        createUnitDto.floor,
        createUnitDto.label,
        createUnitDto.percentage,
        createUnitDto.consortiumId,
      );
      return { message: 'Unit created succesfully' };
    } catch (error) {
      if (error instanceof UnitLabelInvalidError) {
        throw new BadRequestException(error.message);
      }

      throw new Error(error);
    }
  }
}
