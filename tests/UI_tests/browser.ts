import { chromium } from '@playwright/test'

(async () => {

    //open anew browser
    const browser = await chromium.launch({
        headless: false
    });
    //create new context
    const context = await browser.newContext();
    //create new page
    const page = await context.newPage();
    //launch Applciation
    await page.goto("https://www.google.com");
    //get the title and log
    console.log(await page.title());
    //close the bwrowser
    await browser.close();

})();
