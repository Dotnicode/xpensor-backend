import { Module } from '@nestjs/common';
import { PrinterModule } from 'src/shared/printer/printer.module';
import { REPORT_GENERATOR_TOKEN } from 'src/shared/tokens/printer.token';
import { ConsortiumRepository } from '../consortiums/infrastructure/consortium.repository';
import { IUnitRepository } from '../units/domain/interfaces/repository.interface';
import { UnitRepository } from '../units/infrastructure/unit.repository';
import { UnitModule } from '../units/unit.module';
import { CloseSettlementUseCase } from './application/use-cases/close.usecase';
import { ListSettlementUseCase } from './application/use-cases/list.usecase';
import { PreviewSettlementUseCase } from './application/use-cases/preview.usecase';
import { GenerateSettlementReportUseCase } from './application/use-cases/report.usecase';
import type { IReportGenerator } from './domain/interfaces/report.interface';
import { PdfSettlementReportService } from './infrastructure/printer/pdf-settlement-report.service';
import { SettlementRepository } from './infrastructure/repository/settlement.repository';
import { SettlementController } from './presentation/settlement.controller';

@Module({
  imports: [PrinterModule, UnitModule],
  controllers: [SettlementController],
  providers: [
    SettlementRepository,
    ConsortiumRepository,
    {
      provide: REPORT_GENERATOR_TOKEN,
      useClass: PdfSettlementReportService,
    },
    {
      provide: PreviewSettlementUseCase,
      useFactory: (
        settlementRepository: SettlementRepository,
        consortiumRepository: ConsortiumRepository,
        unitRepository: IUnitRepository,
      ) => {
        return new PreviewSettlementUseCase(
          settlementRepository,
          consortiumRepository,
          unitRepository,
        );
      },
      inject: [SettlementRepository, ConsortiumRepository, UnitRepository],
    },
    {
      provide: CloseSettlementUseCase,
      useFactory: (
        settlementRepository: SettlementRepository,
        consortiumRepository: ConsortiumRepository,
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
      useFactory: (settlementRepository: SettlementRepository) => {
        return new ListSettlementUseCase(settlementRepository);
      },
      inject: [SettlementRepository],
    },
    {
      provide: GenerateSettlementReportUseCase,
      useFactory: (
        reportGenerator: IReportGenerator,
        settlementRepository: SettlementRepository,
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
