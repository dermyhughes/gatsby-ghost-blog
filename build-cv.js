const puppeteer = require('puppeteer');
const fs = require('fs');
const { spawn, execSync } = require('child_process');
const waitOn = require('wait-on');

async function generatePdf() {
  // The URL of the webpage you want to generate a PDF from
  const url = 'http://localhost:9000/cvraw';

  // Set up Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Generate the PDF file
  const pdfBuffer = await page.pdf({ format: 'A4' });

  // Write the PDF to a file in the 'public/exports' directory
  fs.writeFileSync(`${__dirname}/static/dermot-hughes-cv.pdf`, pdfBuffer);

  // Close Puppeteer
  await browser.close();
}

async function main() {
  // Start the Gatsby development server as a child process
  const gatsby = spawn('gatsby', ['serve', '--port', '9000']);

  // Wait for the development server to start
  await waitOn({
    resources: ['tcp:localhost:9000'],
  });

  // Generate the PDF
  await generatePdf();

  // Stop the Gatsby development server
  gatsby.kill();

  // Build the Gatsby site
  execSync('gatsby build', { stdio: 'inherit' });
}

main();
