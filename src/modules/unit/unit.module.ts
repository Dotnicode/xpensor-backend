import { Module } from '@nestjs/common';

import { CreateUnitUseCase } from './application/use-cases/create-unit.usecase';
import { UnitController } from './presentation/unit.controller';
import { FindAllUnitsByConsortiumIdUseCase } from './application/use-cases/find-all-units-by-consortium-id.usecase';
import { UnitRepository } from './infrastructure/repository/unit.repository';

@Module({
  controllers: [UnitController],
  providers: [
    UnitRepository,
    {
      provide: CreateUnitUseCase,
      useFactory: (repository: UnitRepository) => {
        return new CreateUnitUseCase(repository);
      },
      inject: [UnitRepository],
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
