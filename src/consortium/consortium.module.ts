import { Module } from '@nestjs/common';
import { ConsortiumRepository } from './infrastructure/repositories/consortium.repository';
import { CreateConsortiumUseCase } from './application/use-cases/create-consortium.usecase';
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
  ],
})
export class ConsortiumModule {}
