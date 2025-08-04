import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { ISettlement } from 'src/shared/interfaces/settlement.interface';

export const settlementReportDefinition = (
  settlement: ISettlement,
): TDocumentDefinitions => ({
  content: [
    {
      text: 'Xpensor Settlement Report',
      style: 'header',
    },
    {
      text: `Settlement ID: ${settlement.id}`,
      style: 'subheader',
    },
    {
      text: `Settlement Date: ${settlement.createdAt?.toLocaleString()}`,
      style: 'subheader',
    },
    {
      text: `Settlement Amount: ${new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(settlement.total)}`,
      style: 'subheader',
    },
  ],
  styles: {
    header: {
      fontSize: 32,
      bold: true,
      margin: [0, 0, 0, 5],
    },
    subheader: {
      fontSize: 12,
      bold: false,
      margin: [0, 10, 0, 5],
    },
  },
});
