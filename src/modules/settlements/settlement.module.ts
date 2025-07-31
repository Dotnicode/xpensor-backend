import { Module } from '@nestjs/common';
import { ConsortiumRepository } from '../consortium/infrastructure/consortium.repository';
import { ExpenseRepository } from '../expenses/infrastructure/expense.repository';
import { UnitRepository } from '../unit/infrastructure/unit.repository';
import { PreviewSettlementUseCase } from './application/use-cases/preview.usecase';
import { SettlementRepository } from './infrastructure/settlement.repository';
import { SettlementController } from './presentation/settlement.controller';
import { CloseSettlementUseCase } from './application/use-cases/close.usecase';
import { ListSettlementUseCase } from './application/use-cases/list.usecase';

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
    {
      provide: CloseSettlementUseCase,
      useFactory: (
        settlementRepository: SettlementRepository,
        consortiumRepository: ConsortiumRepository,
        expenseRepository: ExpenseRepository,
        unitRepository: UnitRepository,
      ) => {
        return new CloseSettlementUseCase(
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
    {
      provide: ListSettlementUseCase,
      useFactory: (settlementRepository: SettlementRepository) => {
        return new ListSettlementUseCase(settlementRepository);
      },
      inject: [SettlementRepository],
    },
  ],
})
export class SettlementModule {}
