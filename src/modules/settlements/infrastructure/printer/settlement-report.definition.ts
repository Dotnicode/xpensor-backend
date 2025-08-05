import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { ISettlement } from 'src/shared/interfaces/settlement.interface';
import { CurrencyFormatter } from 'src/shared/utils/currency-formatter.util';

const styles: StyleDictionary = {
  header: {
    fontSize: 10,
    color: 'gray',
  },
  h1: {
    fontSize: 16,
    margin: [0, 5],
    bold: true,
  },
  info: {
    fontSize: 12,
    lineHeight: 1.2,
    bold: true,
  },
  contact: {
    fontSize: 10,
    lineHeight: 1.2,
    marginTop: 20,
    marginLeft: 20,
  },
};

export const settlementReportDefinition = (
  settlement: ISettlement,
): TDocumentDefinitions => {
  return {
    pageSize: 'A4',
    pageOrientation: 'portrait',
    pageMargins: [40, 40, 40, 40],
    defaultStyle: {
      font: 'Roboto',
    },
    header: [
      {
        text: `Liquidación de Expensas`,
        alignment: 'right',
        style: 'header',
        margin: 20,
      },
    ],
    content: [
      {
        text: 'CONSORCIO EDIFICIO LAPRIDA 454',
        style: 'h1',
      },
      {
        text: [`SAN MIGUEL DE TUCUMÁN\n`, `C.U.I.T.: 30-70926918-2\n`],
        style: 'info',
      },
      {
        text: [
          `CPN. TERESA DEL JESÚS OLMOS\n`,
          `LAPRIDA 454 5C\n`,
          `+54 (381) 641 - 4522\n`,
          `TEREJOLMOS@GMAIL.COM`,
        ],
        style: 'contact',
      },
      {
        margin: [0, 20],
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [20, 'auto', 'auto', 'auto', 'auto'],
          body: [
            [
              { text: '#', alignment: 'center' },
              'Piso',
              'Div.',
              'Porcentual',
              'Importe',
            ],
            ...settlement.summary.map((unit, i) => [
              { text: i + 1, alignment: 'center' },
              unit.unitId,
              unit.label || 'n/a',
              'n/a',
              CurrencyFormatter.toARS(unit.amount),
            ]),
          ],
        },
      },
    ],
    styles,
  };
};
