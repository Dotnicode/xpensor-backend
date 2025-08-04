import PdfPrinter from 'pdfmake';
import type { TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces';
import { pdfDocumentToBuffer } from 'src/shared/utils/pdf-to-buffer.util';
import { IPrinter } from '../interface/printer.interface';

const fonts: TFontDictionary = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Bold.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-BoldItalic.ttf',
  },
};

export class PdfPrinterService implements IPrinter {
  private printer = new PdfPrinter(fonts);

  print(docDefinition: TDocumentDefinitions): Promise<Buffer> {
    try {
      const pdf = this.printer.createPdfKitDocument(docDefinition);
      return pdfDocumentToBuffer(pdf);
    } catch (error) {
      throw new Error(`Failed to print PDF: ${error}`);
    }
  }
}
