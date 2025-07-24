import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUnitUseCase } from '../application/use-cases/create-unit.usecase';
import { ApartmentInvalidError } from '../domain/exceptions/apartment.exception';
import { CreateUnitRequestDto } from './dto/create-unit.request.dto';
import { FindAllUnitsByConsortiumIdUseCase } from '../application/use-cases/find-all-units-by-consortium-id.usecase';
import { UnitExistsException } from '../domain/exceptions/unit-exists.exception';
import { ConsortiumNotExistsException } from '../domain/exceptions/consortium-not-exists.exception';

@UseGuards(AuthGuard('jwt'))
@Controller('units')
export class UnitController {
  constructor(
    private readonly createUnitUseCase: CreateUnitUseCase,
    private readonly findAllUnitsByConsortiumIdUseCase: FindAllUnitsByConsortiumIdUseCase,
  ) {}

  @Post()
  async createUnit(@Body() createUnitRequestDto: CreateUnitRequestDto) {
    try {
      await this.createUnitUseCase.execute(createUnitRequestDto);
      return {
        message: `Unit ${createUnitRequestDto.floor}${createUnitRequestDto.apartment} created succesfully`,
      };
    } catch (error) {
      if (error instanceof ApartmentInvalidError) {
        throw new BadRequestException(error.message);
      }
      if (error instanceof UnitExistsException) {
        throw new BadRequestException(error.message);
      }
      if (error instanceof ConsortiumNotExistsException) {
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
