import { Module } from '@nestjs/common';
import { PRINTER_TOKEN } from '../tokens/printer.token';
import { PdfPrinterService } from './implementations/pdf-printer.service';

@Module({
  imports: [PdfPrinterService],
  controllers: [],
  providers: [
    {
      provide: PRINTER_TOKEN,
      useClass: PdfPrinterService,
    },
  ],
  exports: [PRINTER_TOKEN, PdfPrinterService],
})
export class PrinterModule {}
