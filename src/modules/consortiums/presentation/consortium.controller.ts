import { AuthRequest } from 'src/shared/interfaces/auth-request.interface';

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateConsortiumInputDto } from '../application/dto/create-consortium.input.dto';
import { ConsortiumNotExistsException } from '../application/exceptions/consortium-not-exists.exception';
import { CreateConsortiumUseCase } from '../application/use-cases/create.usecase';
import { DeleteConsortiumUseCase } from '../application/use-cases/delete.usecase';
import { FindConsortiumByIdUseCase } from '../application/use-cases/find-by-id';
import { ListConsortiumsByUserIdUseCase } from '../application/use-cases/list-by-user-id.usecase';
import { UpdateConsortiumUseCase } from '../application/use-cases/update.usecase';
import { Consortium } from '../domain/consortium.entity';
import { InvalidTaxIdException } from '../domain/errors/invalid-tax-id.error';
import { NotOwnerException } from '../domain/errors/not-owner.error';
import { CreateConsortiumRequestDto } from './dto/create-consortium.request.dto';
import { UpdateConsortiumRequestDto } from './dto/update-consortium.request.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('consortiums')
export class ConsortiumController {
  constructor(
    private readonly createConsortiumUseCase: CreateConsortiumUseCase,
    private readonly listConsortiumsByUserIdUseCase: ListConsortiumsByUserIdUseCase,
    private readonly findConsortiumByIdUseCase: FindConsortiumByIdUseCase,
    private readonly updateConsortiumUseCase: UpdateConsortiumUseCase,
    private readonly deleteConsortiumUseCase: DeleteConsortiumUseCase,
  ) {}

  @Post()
  async create(
    @Body() createConsortiumDto: CreateConsortiumRequestDto,
    @Request() req: AuthRequest,
  ): Promise<string | undefined> {
    try {
      const { sub: administradorId } = req.user;
      const input: CreateConsortiumInputDto = {
        name: createConsortiumDto.name,
        taxId: createConsortiumDto.taxId,
        address: createConsortiumDto.address,
      };

      await this.createConsortiumUseCase.execute(input, administradorId);

      return 'Consortium created successfully';
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @Get()
  async listByUserId(@Request() req: AuthRequest): Promise<Consortium[]> {
    const { sub: userId } = req.user;

    const consortiums =
      await this.listConsortiumsByUserIdUseCase.execute(userId);

    return consortiums;
  }

  @Get(':consortiumId')
  async findById(
    @Param('consortiumId', ParseUUIDPipe) consortiumId: string,
    @Request() req: AuthRequest,
  ): Promise<Consortium | undefined> {
    const { sub: userId } = req.user;

    try {
      const consortium = await this.findConsortiumByIdUseCase.execute(
        consortiumId,
        userId,
      );

      return consortium;
    } catch (error) {
      if (error instanceof ConsortiumNotExistsException) {
        throw new NotFoundException(error.message);
      }
    }
  }

  @Put(':consortiumId')
  async update(
    @Param('consortiumId', ParseUUIDPipe) consortiumId: string,
    @Body() updateConsortiumRequestDto: UpdateConsortiumRequestDto,
    @Request() req: AuthRequest,
  ): Promise<string> {
    const { sub: userId } = req.user;

    try {
      await this.updateConsortiumUseCase.execute(
        consortiumId,
        updateConsortiumRequestDto,
        userId,
      );

      return 'Consortium updated successfully';
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
      if (error instanceof ConsortiumNotExistsException) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }

  @Delete(':consortiumId')
  async delete(
    @Param('consortiumId', ParseUUIDPipe) consortiumId: string,
    @Request() req: AuthRequest,
  ): Promise<string> {
    const { sub: userId } = req.user;

    try {
      await this.deleteConsortiumUseCase.execute(consortiumId, userId);
      return 'Consortium deleted successfully';
    } catch (error) {
      if (error instanceof NotOwnerException) {
        throw new ForbiddenException(error.message);
      }
      if (error instanceof ConsortiumNotExistsException) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }
}
