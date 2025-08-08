import { Module } from '@nestjs/common';
import { IConsortiumRepository } from 'src/shared/interfaces/consortium.interface';
import { ITransactionRepository } from 'src/shared/interfaces/transaction.interface';
import { PrinterModule } from 'src/shared/printer/printer.module';
import { REPORT_GENERATOR_TOKEN } from 'src/shared/tokens/printer.token';
import { ConsortiumRepository } from '../consortiums/infrastructure/consortium.repository';
import { TransactionRepository } from '../transactions/infrastructure/repository/transaction.repository';
import { TransactionsModule } from '../transactions/transactions.module';
import { IUnitRepository } from '../units/domain/interfaces/repository.interface';
import { UnitRepository } from '../units/infrastructure/unit.repository';
import { UnitModule } from '../units/unit.module';
import { CloseSettlementUseCase } from './application/use-cases/close.usecase';
import { ListSettlementUseCase } from './application/use-cases/list.usecase';
import { PreviewSettlementUseCase } from './application/use-cases/preview.usecase';
import { GenerateSettlementReportUseCase } from './application/use-cases/report.usecase';
import type { IReportGenerator } from './domain/interfaces/report-generator.interface';
import { ISettlementRepository } from './domain/interfaces/repository.interface';
import { PdfSettlementReportService } from './infrastructure/printer/pdf-settlement-report.service';
import { SettlementRepositoryMapper } from './infrastructure/repository/repository.mapper';
import { SettlementRepository } from './infrastructure/repository/settlement.repository';
import { SettlementController } from './presentation/settlement.controller';

@Module({
  imports: [PrinterModule, UnitModule, TransactionsModule],
  controllers: [SettlementController],
  providers: [
    SettlementRepository,
    ConsortiumRepository,
    SettlementRepositoryMapper,
    {
      provide: REPORT_GENERATOR_TOKEN,
      useClass: PdfSettlementReportService,
    },
    {
      provide: PreviewSettlementUseCase,
      useFactory: (
        settlementRepository: ISettlementRepository,
        consortiumRepository: IConsortiumRepository,
        unitRepository: IUnitRepository,
        transactionRepository: ITransactionRepository,
      ) => {
        return new PreviewSettlementUseCase(
          settlementRepository,
          consortiumRepository,
          unitRepository,
          transactionRepository,
        );
      },
      inject: [
        SettlementRepository,
        ConsortiumRepository,
        UnitRepository,
        TransactionRepository,
      ],
    },
    {
      provide: CloseSettlementUseCase,
      useFactory: (
        settlementRepository: ISettlementRepository,
        consortiumRepository: IConsortiumRepository,
        unitRepository: IUnitRepository,
      ) => {
        return new CloseSettlementUseCase(
          settlementRepository,
          consortiumRepository,
          unitRepository,
        );
      },
      inject: [SettlementRepository, ConsortiumRepository, UnitRepository],
    },
    {
      provide: ListSettlementUseCase,
      useFactory: (settlementRepository: ISettlementRepository) => {
        return new ListSettlementUseCase(settlementRepository);
      },
      inject: [SettlementRepository],
    },
    {
      provide: GenerateSettlementReportUseCase,
      useFactory: (
        reportGenerator: IReportGenerator,
        settlementRepository: ISettlementRepository,
      ) => {
        return new GenerateSettlementReportUseCase(
          reportGenerator,
          settlementRepository,
        );
      },
      inject: [REPORT_GENERATOR_TOKEN, SettlementRepository],
    },
  ],
  exports: [],
})
export class SettlementModule {}
