const puppeteer = require('puppeteer');
const fs = require('fs');
const waitOn = require('wait-on');

// The URL of the webpage you want to generate a PDF from
const URL = process.argv[2]; // URL passed as argument

async function generatePdf() {
  // Set up Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL, {
    waitUntil: 'networkidle2',
    timeout: 120000, // 2 minutes
  });

  // Check if the page has loaded
  const pageLoaded = await page.evaluate(() => {
    // Check if the page has the expected title
    const expectedTitle = 'Dermot Hughes CV';
    const actualTitle = document.title;
    if (actualTitle !== expectedTitle) {
      return false;
    }

    // Check if the page has the expected content
    const expectedContent = 'Personal Profile';
    const actualContent = document.body.innerText;
    if (!actualContent.includes(expectedContent)) {
      return false;
    }

    return true;
  });

  if (!pageLoaded) {
    throw new Error('Page did not load');
  }

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
  // Wait for the specified URL to become available
  await waitOn({
    resources: [URL],
  });

  // Generate the PDF
  await generatePdf();
}

main();
