Puppeteer Scrapers

Скрипты для парсинга товаров с сайта с использованием Puppeteer.

Установка

Клонировать репозиторий:

git clone git@github.com:Malvina14092004/testParse.git



Установить зависимости:

npm install

Скрипты
1. script.js — парсинг одного товара

Описание:
Собирает данные конкретного товара и делает скриншот.

Запуск:

node script.js <url_товара> <регион>


Результат:

data/product.txt — JSON с полями: rating, price, reviews, oldPrice

screenshots/screenshot.jpg — скриншот страницы

2. api-parser.js — парсинг каталога товаров

Описание:
Собирает данные всех товаров на странице категории.

Запуск:

node api-parser.js <url_категории>


Результат:

data/products-api.txt — текст с данными товаров (название, ссылка, рейтинг, отзывы, цена, скидка)