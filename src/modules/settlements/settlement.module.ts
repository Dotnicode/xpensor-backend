import { Module } from '@nestjs/common';
import { ConsortiumRepository } from '../consortium/infrastructure/consortium.repository';
import { ExpenseRepository } from '../expenses/infrastructure/expense.repository';
import { UnitRepository } from '../unit/infrastructure/unit.repository';
import { PreviewSettlementUseCase } from './application/use-cases/preview.usecase';
import { SettlementRepository } from './infrastructure/settlement.repository';
import { SettlementController } from './presentation/settlement.controller';

@Module({
  imports: [],
  controllers: [SettlementController],
  providers: [
    SettlementRepository,
    ConsortiumRepository,
    ExpenseRepository,
    UnitRepository,
    {
      provide: PreviewSettlementUseCase,
      useFactory: (
        settlementRepository: SettlementRepository,
        consortiumRepository: ConsortiumRepository,
        expenseRepository: ExpenseRepository,
        unitRepository: UnitRepository,
      ) => {
        return new PreviewSettlementUseCase(
          settlementRepository,
          consortiumRepository,
          expenseRepository,
          unitRepository,
        );
      },
      inject: [
        SettlementRepository,
        ConsortiumRepository,
        ExpenseRepository,
        UnitRepository,
      ],
    },
  ],
})
export class SettlementModule {}
