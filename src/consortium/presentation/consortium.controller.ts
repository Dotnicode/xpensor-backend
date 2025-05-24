import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateConsortiumUseCase } from '../application/use-cases/create-consortium.usecase';
import { CreateConsortiumDto } from '../application/dto/create-consortium.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequest } from '../../common/interfaces/auth-request.interface';

@Controller('consortiums')
export class ConsortiumController {
  constructor(
    private readonly createConsortiumUseCase: CreateConsortiumUseCase,
  ) {}

  @UseGuards(AuthGuard('jwt'))
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
}
