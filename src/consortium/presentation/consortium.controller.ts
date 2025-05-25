import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateConsortiumUseCase } from '../application/use-cases/create-consortium.usecase';
import { CreateConsortiumDto } from '../application/dto/create-consortium.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequest } from '../../common/interfaces/auth-request.interface';
import { FindAllByOwnerConsortiumsUseCase } from '../application/use-cases/find-all-consortiums-by-owner.usecase';
import { FindConsortiumByIdUseCase } from '../application/use-cases/find-consortium-by-id.usecase';
import { FindAllConsortiumsUseCase } from '../application/use-cases/find-all-consortiums.usecase';

@UseGuards(AuthGuard('jwt'))
@Controller('consortiums')
export class ConsortiumController {
  constructor(
    private readonly createConsortiumUseCase: CreateConsortiumUseCase,
    private readonly findAllByOwnerConsortiumsUseCase: FindAllByOwnerConsortiumsUseCase,
    private readonly findConsortiumByIdUseCase: FindConsortiumByIdUseCase,
    private readonly findAllConsortiumsUseCase: FindAllConsortiumsUseCase,
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
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    const consortium = await this.findConsortiumByIdUseCase.execute(id);

    return { consortium };
  }
}
