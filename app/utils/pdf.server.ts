import puppeteer from 'puppeteer';

export const createPDF = async (id: any) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:3000/pdf/${id}`, {
        waitUntil: 'networkidle2'
    });
    const pdfBuffer = await page.pdf();
    await browser.close();

    return pdfBuffer;
}
