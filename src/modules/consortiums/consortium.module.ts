import { Module } from '@nestjs/common';

import { CreateConsortiumUseCase } from './application/use-cases/create.usecase';
import { DeleteConsortiumUseCase } from './application/use-cases/delete.usecase';
import { ListConsortiumsByUserIdUseCase } from './application/use-cases/list-by-user-id.usecase';
import { FindConsortiumByIdUseCase } from './application/use-cases/find-by-id';
import { UpdateConsortiumUseCase } from './application/use-cases/update.usecase';
import { ConsortiumRepository } from './infrastructure/consortium.repository';
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
      provide: ListConsortiumsByUserIdUseCase,
      useFactory: (repository: ConsortiumRepository) => {
        return new ListConsortiumsByUserIdUseCase(repository);
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
  exports: [ConsortiumRepository],
})
export class ConsortiumModule {}
