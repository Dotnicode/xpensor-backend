import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export interface IPrinter {
  print(docDefinition: TDocumentDefinitions): Promise<Buffer>;
}
