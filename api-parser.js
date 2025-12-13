const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
    const browser = await puppeteer.launch({headless:  false,});
    const page = await browser.newPage();
    const url = process.argv[2];

    // Убираем всплывающие окна
    await page.goto(url,  { waitUntil: 'networkidle2' , timeout: 0});
    await page.setViewport({width: 1000, height: 1000})

    await page.waitForSelector('.Content_remove__qdwv0', { visible: true  });
    await page.click('.Content_remove__qdwv0');

    await page.waitForSelector('.MobileAppAlert_close__1B3au', { visible: true  });
    await page.click('.MobileAppAlert_close__1B3au');

    await page.waitForSelector('.Button_button__uHbCf.Button_size_M__KYaFm.OutlineButton_outline__JK_YC.OutlineButton_color_primary___NYOX.Button_withText__7ypqP', { visible: true  });
    await page.click('.Button_button__uHbCf.Button_size_M__KYaFm.OutlineButton_outline__JK_YC.OutlineButton_color_primary___NYOX.Button_withText__7ypqP');

    await page.waitForSelector('.MobileAppBanner_remove__YNSfv', { visible: true  });
    await page.click('.MobileAppBanner_remove__YNSfv');

    await new  Promise(resolve => setTimeout(resolve, 3000))

    const products = await page.evaluate(() => {
        const items = document.querySelectorAll(
            'article.UiProductTileMain_root__Zk2eh'
        );
        const data = [];

        items.forEach(item => {
            const nameElement =
                item.querySelector('.UiProductTileMain_longName__29CCd');
            const title = nameElement?.innerText.trim() || null;
            const link = nameElement?.closest('a')?.href || null;

            const rating =
                item.querySelector('.UiProductButtonRating_rating__I6GGP')
                    ?.innerText || null;
            const reviews =
                item.querySelector('.UiProductButtonRating_reviews__w_V1_')
                    ?.innerText
                    ?.replace(/\D/g, '') || null;
            const price =
                item.querySelector('.Price_price__QzA8L.Price_size_SM__EN_CS')
                    ?.innerText || null;
            const oldPrice =
                item.querySelector('.Price_price__QzA8L.Price_role_old__r1uT1')
                    ?.innerText || null;
            const discount =
                item.querySelector('.Purchase_discount__fPiSP')
                    ?.innerText || null;

            data.push({
                title,
                link,
                rating,
                reviews,
                price,
                oldPrice,
                discount
            });
        });

        return data;
    });

    const resultText = products.map(product => {
        return `
    Название товара: ${product.title || '—'}
    Ссылка на страницу товара: ${product.link || '—'}
    Рейтинг: ${product.rating || '—'}
    Количество отзывов: ${product.reviews || '—'}
    Цена: ${product.price || '—'}
    Акционная цена: ${product.price && product.oldPrice ? product.price : '—'}
    Цена до акции: ${product.oldPrice || '—'}
    Размер скидки: ${product.discount || '—'}
    `.trim();
    }).join('\n\n----------------------------\n\n');

    fs.writeFileSync("data/products-api.txt", resultText, "utf8");
    console.log(`Готово! Всего товаров: ${products.length}. Данные сохранены в products-api.txt`);

    await browser.close();
})();
