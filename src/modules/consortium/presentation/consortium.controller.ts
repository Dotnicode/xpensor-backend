import { AuthRequest } from 'src/common/interfaces/auth-request.interface';

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateConsortiumInputDto } from '../application/dto/create-consortium.input.dto';
import { UpdateConsortiumInputDto } from '../application/dto/update-consortium.input.dto';
import { CreateConsortiumUseCase } from '../application/use-cases/create-consortium.usecase';
import { DeleteConsortiumUseCase } from '../application/use-cases/delete-consortium.usecase';
import { FindAllByAdministratorConsortiumsUseCase } from '../application/use-cases/find-all-consortiums-by-administrator.usecase';
import { FindAllConsortiumsUseCase } from '../application/use-cases/find-all-consortiums.usecase';
import { FindConsortiumByIdUseCase } from '../application/use-cases/find-consortium-by-id.usecase';
import { UpdateConsortiumUseCase } from '../application/use-cases/update-consortium.usecase';
import { InvalidTaxIdException } from '../domain/errors/invalid-tax-id.error';
import { NotOwnerException } from '../domain/errors/not-owner.error';
import { CreateConsortiumRequestDto } from './dto/create-consortium.request.dto';
import { UpdateConsortiumRequestDto } from './dto/update-consortium.request.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('consortiums')
export class ConsortiumController {
  constructor(
    private readonly createConsortiumUseCase: CreateConsortiumUseCase,
    private readonly findAllByAdministratorConsortiumsUseCase: FindAllByAdministratorConsortiumsUseCase,
    private readonly findConsortiumByIdUseCase: FindConsortiumByIdUseCase,
    private readonly findAllConsortiumsUseCase: FindAllConsortiumsUseCase,
    private readonly updateConsortiumUseCase: UpdateConsortiumUseCase,
    private readonly deleteConsortiumUseCase: DeleteConsortiumUseCase,
  ) {}

  @Post()
  async create(
    @Body() createConsortiumDto: CreateConsortiumRequestDto,
    @Request() req: AuthRequest,
  ) {
    const { sub: administradorId } = req.user;
    const input: CreateConsortiumInputDto = {
      name: createConsortiumDto.name,
      taxId: createConsortiumDto.taxId,
      address: createConsortiumDto.address,
    };

    await this.createConsortiumUseCase.execute(input, administradorId);

    return { message: 'Consortium created successfully' };
  }

  @Get('all')
  async findAll() {
    const consortiums = await this.findAllConsortiumsUseCase.execute();

    return { consortiums };
  }

  @Get()
  async findAllByAdministratorId(@Request() req: AuthRequest) {
    console.log(req.user);
    const { sub: administratorId } = req.user;

    const consortiums =
      await this.findAllByAdministratorConsortiumsUseCase.execute(
        administratorId,
      );

    return { consortiums };
  }

  @Get(':id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: AuthRequest,
  ) {
    const { sub: userId } = req.user;

    try {
      const consortium = await this.findConsortiumByIdUseCase.execute(
        id,
        userId,
      );

      return { consortium };
    } catch (error) {
      if (error instanceof NotOwnerException) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateConsortiumRequestDto: UpdateConsortiumRequestDto,
    @Request() req: AuthRequest,
  ) {
    const { sub: administratorId } = req.user;

    const input: UpdateConsortiumInputDto = {
      name: updateConsortiumRequestDto.name,
      taxId: updateConsortiumRequestDto.taxId,
      address: updateConsortiumRequestDto.address,
    };

    try {
      await this.updateConsortiumUseCase.execute(id, input, administratorId);

      return { message: 'Consortium updated successfully' };
    } catch (error) {
      if (error instanceof NotOwnerException) {
        throw new ForbiddenException(error.message);
      }

      if (error instanceof InvalidTaxIdException) {
        throw new BadRequestException({
          message: error.message,
          invalidValue: error.invalidValue,
        });
      }

      throw error;
    }
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: AuthRequest,
  ) {
    const { sub: userId } = req.user;

    try {
      await this.deleteConsortiumUseCase.execute(id, userId);

      return { message: 'Consortium deleted successfully' };
    } catch (error) {
      if (error instanceof NotOwnerException) {
        throw new ForbiddenException(error.message);
      }

      throw error;
    }
  }
}
