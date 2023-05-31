const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:9000/cvraw', { waitUntil: 'networkidle2' });
  await page.pdf({ path: 'static/dermot-hughes-cv.pdf', format: 'A4' });

  await browser.close();
}

run();
