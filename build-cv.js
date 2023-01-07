const puppeteer = require('puppeteer');
const fs = require('fs');
const { spawn } = require('child_process');
const waitOn = require('wait-on');

// The URL of the webpage you want to generate a PDF from
const PORT = '9001';
const URL = `http://localhost:${PORT}/cvraw`;

async function generatePdf() {
  // Set up Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: 'networkidle2' });

  // Generate the PDF file
  const pdfBuffer = await page.pdf({ format: 'A4' });

  // Confirm pdfBuffer does not just contain "Not found"
  if (pdfBuffer.toString().includes('Not found')) {
    throw new Error('PDF generation failed');
  }

  // Write the PDF to a file in the 'public/exports' directory
  fs.writeFileSync(`${__dirname}/static/dermot-hughes-cv.pdf`, pdfBuffer);

  // Close Puppeteer
  await browser.close();
}

async function main() {
  // Start the Gatsby development server as a child process
  const gatsby = spawn('gatsby', ['serve', '--port', PORT]);

  // Wait for the development server to start
  await waitOn({
    resources: [`tcp:localhost:${PORT}`],
  });

  // Generate the PDF
  await generatePdf();

  // Stop the Gatsby development server
  gatsby.kill();

  // Wait for the development server to stop
  await waitOn({
    resources: [`tcp:localhost:${PORT}`],
    reverse: true,
  });

  // Run gatsby build command
  spawn('gatsby', ['build']);
}

main();
