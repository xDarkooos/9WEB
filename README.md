Запуск рішень

Відкрити термінал у папці з файлами проєкту і запустити потрібний файл командою: node <назва_файлу>.js <порт>
Приклад: node rest_list.js 3000 або node rest_create.js 3000

Перевірити роботу через curl.
Отримати список елементів:
curl -i http://localhost:3000/items

Отримати елемент за id:
curl -i http://localhost:3000/items/1

Створити новий елемент:
curl -X POST http://localhost:3000/items
 -H "Content-Type: application/json" -d "{"id":2,"name":"Beta"}"

Оновити елемент:
curl -X PUT http://localhost:3000/items/2
 -H "Content-Type: application/json" -d "{"name":"Updated Beta"}"

Видалити елемент:
curl -X DELETE http://localhost:3000/items/2

Виконані вправи:

REST LIST
Файл: rest_list.js
Маршрут: /items
Зчитує масив об’єктів з файлу data.json та повертає його у вигляді JSON-відповіді.

REST GET BY ID
Файл: rest_get_by_id.js
Маршрут: /items/:id
Зчитує дані з файлу data.json та повертає один об’єкт за вказаним id. Якщо елемент не знайдено — повертає 404.

REST CREATE
Файл: rest_create.js
Маршрут: /items
Приймає JSON-дані через POST-запит, додає новий об’єкт до файлу data.json та повертає створений елемент зі статусом 201.

REST UPDATE
Файл: rest_update.js
Маршрут: /items/:id
Оновлює існуючий об’єкт за id на основі переданих JSON-даних та повертає оновлений елемент. Якщо об’єкт не знайдено - повертає 404.

REST DELETE
Файл: rest_delete.js
Маршрут: /items/:id
Видаляє об’єкт з файлу data.json за вказаним id. У разі успіху повертає статус 200, якщо об’єкт не знайдено - 404.
