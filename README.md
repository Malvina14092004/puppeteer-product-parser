# Puppeteer Product Parser

Скрипты для парсинга товаров с сайта с использованием Puppeteer.

## Установка

\`\`\`
git clone https://github.com/Malvina14092004/puppeteer-product-parser.git
cd puppeteer-product-parser
npm install
\`\`\`

## Скрипты

### 1. script.js — парсинг одного товара

Собирает данные конкретного товара и делает скриншот.

**Запуск:**
\`\`\`
node script.js <url_товара> <регион>
\`\`\`

**Результат:**
- `data/product.txt` — JSON с полями: rating, price, reviews, oldPrice
- `screenshots/screenshot.jpg` — скриншот страницы

### 2. api-parser.js — парсинг каталога товаров

Собирает данные всех товаров на странице категории.

**Запуск:**
\`\`\`
node api-parser.js <url_категории>
\`\`\`

**Результат:**
- `data/products-api.txt` — текст с данными товаров (название, ссылка, рейтинг, отзывы, цена, скидка)
