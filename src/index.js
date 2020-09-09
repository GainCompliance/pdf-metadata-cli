const {PDFDocument} = require('pdf-lib');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function logMetadata(pdfDoc) {
  console.log('Title:', pdfDoc.getTitle());
  console.log('Author:', pdfDoc.getAuthor());
  console.log('Subject:', pdfDoc.getSubject());
  console.log('Creator:', pdfDoc.getCreator());
  console.log('Keywords:', pdfDoc.getKeywords());
  console.log('Producer:', pdfDoc.getProducer());
  console.log('Creation Date:', pdfDoc.getCreationDate());
  console.log('Modification Date:', pdfDoc.getModificationDate());

  const pages = pdfDoc.getPages();

  pages.forEach((page, index) => {
    console.log(`============ Page ${index + 1} ============`);
    console.log('Position:', page.getPosition());
    console.log('Rotation:', page.getRotation());
    console.log('Height:', page.getHeight());
    console.log('Width:', page.getWidth());
    console.log('Size:', page.getSize());
    console.log('==================================');
  });
}

async function readLocalDocumentMetadata(localPath) {
  const resolvedPath = path.resolve(localPath);

  console.log('Reading: ', resolvedPath);

  const uint8Array = fs.readFileSync(resolvedPath);
  const existingPdfBytes = await PDFDocument.load(uint8Array);

  await logMetadata(existingPdfBytes);
}

async function readUrlDocumentMetadata(url) {
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

  console.log('Reading: ', url);

  const pdfDoc = await PDFDocument.load(existingPdfBytes, {
    updateMetadata: false
  });

  await logMetadata(pdfDoc);
}

export async function pdfStats(options) {
  if ('Local' === options.location) {
    await readLocalDocumentMetadata('./assets/1.pdf');
  }

  if ('URL' === options.location) {
    await readUrlDocumentMetadata('https://pdf-lib.js.org/assets/with_cropbox.pdf');
  }

  return true;
}
