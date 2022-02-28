// This generates a pdf file of the current CV with `npm run generate-cv`

const puppeteer = require(`puppeteer`);

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:8000/cvraw/`); // Generate from a prod build
    await page.pdf({
        path: `./public/dermot-hughes-cv.pdf`, // path (relative to CWD) to save the PDF to.
        format: `A4`,
    });
    await browser.close();
    console.log(`CV pdf generated.`);
})();
