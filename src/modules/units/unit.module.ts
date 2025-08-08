import { Module } from '@nestjs/common';

import { ConsortiumModule } from '../consortiums/consortium.module';
import { ConsortiumRepository } from '../consortiums/infrastructure/consortium.repository';
import { CreateUnitUseCase } from './application/create.usecase';
import { ListUnitsByConsortiumIdUseCase } from './application/list-by-consortium-id.usecase';
import { UnitController } from './presentation/unit.controller';
import { UnitRepository } from './infrastructure/unit.repository';
import { UnitRepositoryMapper } from './infrastructure/unit.mapper';

@Module({
  imports: [ConsortiumModule],
  controllers: [UnitController],
  providers: [
    UnitRepository,
    UnitRepositoryMapper,
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
