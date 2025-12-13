const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({headless: false });
    const page = await browser.newPage();
    const url = process.argv[2];
    const region = process.argv[3];

    await page.goto(url,{ waitUntil: 'networkidle2' , timeout: 0 });
    await page.setViewport({width: 1000, height: 1000})

    // Убираем всплывающие окна
    await page.waitForSelector('.Content_remove__qdwv0', { visible: true  });
    await page.click('.Content_remove__qdwv0');

    await page.waitForSelector('.MobileAppAlert_close__1B3au', { visible: true  });
    await page.click('.MobileAppAlert_close__1B3au');

    await page.waitForSelector('.Button_button__uHbCf.Button_size_M__KYaFm.OutlineButton_outline__JK_YC.OutlineButton_color_primary___NYOX.Button_withText__7ypqP', { visible: true  });
    await page.click('.Button_button__uHbCf.Button_size_M__KYaFm.OutlineButton_outline__JK_YC.OutlineButton_color_primary___NYOX.Button_withText__7ypqP');

    await page.waitForSelector('.MobileAppBanner_remove__YNSfv', { visible: true  });
    await page.click('.MobileAppBanner_remove__YNSfv');

    await new Promise(resolve => setTimeout(resolve, 7000))
    await page.screenshot({ path: 'screenshots/screenshot.jpg', fullPage: true });

    await page.evaluate(() => {
        const btn = document.querySelector('.Region_region__6OUBn');
        if (btn) btn.click();
    });

    await new  Promise(resolve => setTimeout(resolve, 4000))

    await page.waitForSelector('ul[class*="UiRegionListBase_list"]', { visible: true });

    await page.evaluate((region) => {
        const items = [...document.querySelectorAll('li.UiRegionListBase_item__ly_A.UiRegionListBase_bold_ezwq4')];

        const target = items.find(el => {
            const text = el.querySelector('.UiRegionListBase_button__smgMH')?.innerText || '';
            return text.toLowerCase().includes(region.toLowerCase());
        });

        if (target) target.click();
    },region);

    async function getText(selector) {
        return page.evaluate((selector) => {
            const el = document.querySelector(selector);
            if (!el) return null;

            return el.textContent.trim();
        }, selector);
    }

    const rating = await getText('[class*="ActionsRow_stars__EKt42"]');
    const price = await getText('[class*="Price_role_discount"]');
    const reviews = await getText('[class*="ActionsRow_reviews__AfSj_"]');
    const oldPrice = await getText('[class*="Price_role_old"]');

    const product = { rating, price, reviews, oldPrice};
    fs.writeFileSync('data/product.txt', JSON.stringify(product, null, 2));

    await browser.close();

})();