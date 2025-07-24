import { Module } from '@nestjs/common';

import { CreateConsortiumUseCase } from './application/use-cases/create-consortium.usecase';
import { DeleteConsortiumUseCase } from './application/use-cases/delete-consortium.usecase';
import { FindAllByAdministratorConsortiumsUseCase } from './application/use-cases/find-all-consortiums-by-administrator.usecase';
import { FindAllConsortiumsUseCase } from './application/use-cases/find-all-consortiums.usecase';
import { FindConsortiumByIdUseCase } from './application/use-cases/find-consortium-by-id.usecase';
import { UpdateConsortiumUseCase } from './application/use-cases/update-consortium.usecase';
import { ConsortiumRepository } from './infrastructure/repositories/consortium.repository';
import { ConsortiumController } from './presentation/consortium.controller';

@Module({
  controllers: [ConsortiumController],
  providers: [
    ConsortiumRepository,
    {
      provide: CreateConsortiumUseCase,
      useFactory: (repository: ConsortiumRepository) => {
        return new CreateConsortiumUseCase(repository);
      },
      inject: [ConsortiumRepository],
    },
    {
      provide: FindAllByAdministratorConsortiumsUseCase,
      useFactory: (repository: ConsortiumRepository) => {
        return new FindAllByAdministratorConsortiumsUseCase(repository);
      },
      inject: [ConsortiumRepository],
    },
    {
      provide: FindConsortiumByIdUseCase,
      useFactory: (repository: ConsortiumRepository) => {
        return new FindConsortiumByIdUseCase(repository);
      },
      inject: [ConsortiumRepository],
    },
    {
      provide: FindAllConsortiumsUseCase,
      useFactory: (repository: ConsortiumRepository) => {
        return new FindAllConsortiumsUseCase(repository);
      },
      inject: [ConsortiumRepository],
    },
    {
      provide: UpdateConsortiumUseCase,
      useFactory: (repository: ConsortiumRepository) => {
        return new UpdateConsortiumUseCase(repository);
      },
      inject: [ConsortiumRepository],
    },
    {
      provide: DeleteConsortiumUseCase,
      useFactory: (repository: ConsortiumRepository) => {
        return new DeleteConsortiumUseCase(repository);
      },
      inject: [ConsortiumRepository],
    },
  ],
})
export class ConsortiumModule {}
