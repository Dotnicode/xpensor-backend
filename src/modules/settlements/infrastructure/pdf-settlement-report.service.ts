import { Inject, Injectable } from '@nestjs/common';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { ISettlement } from 'src/shared/interfaces/settlement.interface';
import { IPrinter } from 'src/shared/printer/interface/printer.interface';
import { PRINTER_TOKEN } from 'src/shared/tokens/printer.token';
import { IReportGenerator } from '../domain/interfaces/report.interface';
import { SettlementEntity } from '../domain/settlement.entity';
import { settlementReportDefinition } from './printer/settlement-report.definition';

@Injectable()
export class PdfSettlementReportService implements IReportGenerator {
  constructor(@Inject(PRINTER_TOKEN) private readonly printer: IPrinter) {}

  async generate(settlement: SettlementEntity): Promise<Buffer> {
    const docDefinition = this.buildDocumentDefinition(settlement);
    return this.printer.print(docDefinition);
  }

  private buildDocumentDefinition(
    settlement: ISettlement,
  ): TDocumentDefinitions {
    return settlementReportDefinition(settlement);
  }
}
