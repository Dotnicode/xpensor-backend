import {
  BadRequestException,
  Body,
  Controller,
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
import { AuthRequest } from '../../common/interfaces/auth-request.interface';
import { CreateConsortiumDto } from '../application/dto/create-consortium.dto';
import { UpdateConsortiumDto } from '../application/dto/update-consortium.dto';
import { CreateConsortiumUseCase } from '../application/use-cases/create-consortium.usecase';
import { FindAllByOwnerConsortiumsUseCase } from '../application/use-cases/find-all-consortiums-by-owner.usecase';
import { FindAllConsortiumsUseCase } from '../application/use-cases/find-all-consortiums.usecase';
import { FindConsortiumByIdUseCase } from '../application/use-cases/find-consortium-by-id.usecase';
import { UpdateConsortiumUseCase } from '../application/use-cases/update-consortium.usecase';
import { NotOwnerException } from '../domain/exceptions/not-owner.exception';
import { InvalidTaxIdException } from '../domain/exceptions/invalid-tax-id.exception';

@UseGuards(AuthGuard('jwt'))
@Controller('consortiums')
export class ConsortiumController {
  constructor(
    private readonly createConsortiumUseCase: CreateConsortiumUseCase,
    private readonly findAllByOwnerConsortiumsUseCase: FindAllByOwnerConsortiumsUseCase,
    private readonly findConsortiumByIdUseCase: FindConsortiumByIdUseCase,
    private readonly findAllConsortiumsUseCase: FindAllConsortiumsUseCase,
    private readonly updateConsortiumUseCase: UpdateConsortiumUseCase,
  ) {}

  @Post()
  async create(
    @Body() createConsortiumDto: CreateConsortiumDto,
    @Request() req: AuthRequest,
  ) {
    const consortium = await this.createConsortiumUseCase.execute(
      createConsortiumDto.name,
      createConsortiumDto.taxId,
      createConsortiumDto.address,
      req.user.sub,
    );

    return { message: 'Consortium created successfully' };
  }

  @Get('all')
  async findAll() {
    const consortiums = await this.findAllConsortiumsUseCase.execute();

    return { consortiums };
  }

  @Get()
  async findAllByOwnerId(@Request() req: AuthRequest) {
    const consortiums = await this.findAllByOwnerConsortiumsUseCase.execute(
      req.user.sub,
    );

    return { consortiums };
  }

  @Get(':id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: AuthRequest,
  ) {
    try {
      const consortium = await this.findConsortiumByIdUseCase.execute(
        id,
        req.user.sub,
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
    @Body() updateConsortiumDto: UpdateConsortiumDto,
    @Request() req: AuthRequest,
  ) {
    const { sub: userId } = req.user;

    try {
      await this.updateConsortiumUseCase.execute(
        id,
        updateConsortiumDto,
        userId,
      );

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
}
