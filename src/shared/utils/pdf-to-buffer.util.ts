export function pdfDocumentToBuffer(
  pdfDoc: PDFKit.PDFDocument,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    pdfDoc.on('data', (chunk: Buffer<ArrayBufferLike>) => {
      chunks.push(chunk);
    });

    pdfDoc.on('end', () => {
      resolve(Buffer.concat(chunks));
    });

    pdfDoc.on('error', (error) => {
      reject(new Error(`Failed to convert PDF document to buffer: ${error}`));
    });

    pdfDoc.end();
  });
}
