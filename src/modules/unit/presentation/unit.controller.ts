import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUnitUseCase } from '../application/use-cases/create-unit.usecase';
import { UnitLabelInvalidError } from '../domain/exceptions/unit-label.exception';
import { CreateUnitRequestDto } from './dto/create-unit.request.dto';
import { FindAllUnitsByConsortiumIdUseCase } from '../application/use-cases/find-all-units-by-consortium-id.usecase';

@UseGuards(AuthGuard('jwt'))
@Controller('units')
export class UnitController {
  constructor(private readonly createUnitUseCase: CreateUnitUseCase,
    private readonly findAllUnitsByConsortiumIdUseCase: FindAllUnitsByConsortiumIdUseCase
  ) {}

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

  @Get(':consortiumId')
  async getUnits(@Param('consortiumId', ParseUUIDPipe) consortiumId: string) {
    return await this.findAllUnitsByConsortiumIdUseCase.execute(consortiumId);
  }
}
