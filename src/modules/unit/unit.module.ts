import { Module } from '@nestjs/common';

import { ConsortiumModule } from '../consortium/consortium.module';
import { ConsortiumRepository } from '../consortium/infrastructure/consortium.repository';
import { CreateUnitUseCase } from './application/create.usecase';
import { ListUnitsByConsortiumIdUseCase } from './application/list-by-consortium-id.usecase';
import { UnitController } from './presentation/unit.controller';
import { UnitRepository } from './infrastructure/unit.repository';

@Module({
  imports: [ConsortiumModule],
  controllers: [UnitController],
  providers: [
    UnitRepository,
    {
      provide: CreateUnitUseCase,
      useFactory: (
        unitRepository: UnitRepository,
        consortiumRepository: ConsortiumRepository,
      ) => {
        return new CreateUnitUseCase(unitRepository, consortiumRepository);
      },
      inject: [UnitRepository, ConsortiumRepository],
    },
    {
      provide: ListUnitsByConsortiumIdUseCase,
      useFactory: (repository: UnitRepository) => {
        return new ListUnitsByConsortiumIdUseCase(repository);
      },
      inject: [UnitRepository],
    },
  ],
  exports: [UnitRepository],
})
export class UnitModule {}
