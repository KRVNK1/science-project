## Установка

Ввести в терминал
1)composer install
2)npm install

После установки composer также ввести в терминал
3)cp .env.example .env
4)php artisan key:generate

Заполнить .env файл данными (для техникума/дома)

DB_CONNECTION=mysql
DB_HOST=web.edu
DB_PORT=3306
DB_DATABASE=22065_science_articles
DB_USERNAME=22065
DB_PASSWORD=
/
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=science_articles
DB_USERNAME=root
DB_PASSWORD=

Прописать в терминал
5)php artisan migrate:fresh --seed

## Запуск проекта

npm run dev
php artisan serve