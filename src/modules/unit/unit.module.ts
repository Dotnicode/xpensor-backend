import { Module } from '@nestjs/common';

import { CreateUnitUseCase } from './application/use-cases/create-unit.usecase';
import { UnitController } from './presentation/unit.controller';
import { FindAllUnitsByConsortiumIdUseCase } from './application/use-cases/find-all-units-by-consortium-id.usecase';
import { UnitRepository } from './infrastructure/repository/unit.repository';
import { ConsortiumRepository } from '../consortium/infrastructure/repositories/consortium.repository';
import { ConsortiumModule } from '../consortium/consortium.module';

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
      provide: FindAllUnitsByConsortiumIdUseCase,
      useFactory: (repository: UnitRepository) => {
        return new FindAllUnitsByConsortiumIdUseCase(repository);
      },
      inject: [UnitRepository],
    },
  ],
})
export class UnitModule {}
