import { Module } from '@nestjs/common';

import { CreateUnitUseCase } from './application/use-cases/create-unit.usecase';
import { UnitRepository } from './infrastructure/repository/unit.repository';
import { UnitController } from './presentation/unit.controller';

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
  ],
})
export class UnitModule {}
