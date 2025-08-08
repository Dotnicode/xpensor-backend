import {
  BadRequestException,
  Body,
  Controller,
  Get,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUnitUseCase } from '../application/create.usecase';
import { ListUnitsByConsortiumIdUseCase } from '../application/list-by-consortium-id.usecase';
import { ConsortiumNotExistsException } from '../domain/exceptions/consortium-not-exists.exception';
import { UnitExistsException } from '../domain/exceptions/unit-exists.exception';
import { CreateUnitRequestDto } from './dto/create-unit.request.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('units')
export class UnitController {
  constructor(
    private readonly createUnitUseCase: CreateUnitUseCase,
    private readonly findAllUnitsByConsortiumIdUseCase: ListUnitsByConsortiumIdUseCase,
  ) {}

  @Post()
  async createUnit(@Body() createUnitRequestDto: CreateUnitRequestDto) {
    try {
      await this.createUnitUseCase.execute(createUnitRequestDto);
      return {
        message: `Unit ${createUnitRequestDto.floor}${createUnitRequestDto.division} created succesfully`,
      };
    } catch (error) {
      if (error instanceof UnitExistsException) {
        throw new BadRequestException(error.message);
      }
      if (error instanceof ConsortiumNotExistsException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Get()
  async getUnits(@Query('consortiumId', ParseUUIDPipe) consortiumId: string) {
    return await this.findAllUnitsByConsortiumIdUseCase.execute(consortiumId);
  }
}
