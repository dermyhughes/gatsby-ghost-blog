const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  try {
    console.log('Launching Puppeteer...');
    const browser = await puppeteer.launch();

    console.log('Creating a new page...');
    const page = await browser.newPage();

    console.log('Navigating to the cv page...');
    await page.goto('http://localhost:9000/cvraw', {
      waitUntil: 'networkidle2',
    });

    console.log('Generating the PDF...');
    await page.pdf({
      path: `${__dirname}/static/dermot-hughes-cv.pdf`,
      format: 'A4',
      printBackground: true,
    });

    console.log('PDF generated successfully. Closing Puppeteer...');
    await browser.close();

    // Read server PID and kill the process
    console.log('Shutting down the server...');
    const serverPid = fs.readFileSync('server.pid', 'utf-8');
    process.kill(serverPid);
    fs.unlinkSync('server.pid');

    console.log('Server shut down successfully.');
  } catch (error) {
    console.error('An error occurred during the PDF generation process:', error);
  }
})();
