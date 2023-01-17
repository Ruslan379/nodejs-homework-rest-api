//---------------------------routes-------------------------------
//! ------------------ auth -----------------------
// POST -->   http://localhost:3000/api/users/signup
// POST -->   http://localhost:3000/api/users/login
// GET  -->   http://localhost:3000/api/users/logout
// GET  -->   http://localhost:3000/api/users/current
// PATCH -- > http://localhost:3000/api/users

//  Headers --> Authorization -->
//  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2FiNGQzOTFiMmMxNDJjOGY2OTM1YjIiLCJlbWFpbCI6IjU1NUB1a3IubmV0IiwiY3JlYXRlZEF0IjoiMjAyMi0xMi0yN1QxOTo1MzoyOS42MjJaIiwiaWF0IjoxNjcyMzM4ODk2fQ.OF7nTx66ljHbC90VfIGsXGxwLK3ulHIrF104g55g7bA


//* ------------------ contacts ------------------
//! http://localhost:3000/api/contacts
//  http://localhost:3000/api/contacts/id
//  http://localhost:3000/api/contacts/id/favorite
//* http://localhost:3000/api/contacts?skip=0&limit=4
//? http://localhost:3000/api/contacts?skip=1&limit=1

//  http://localhost:3000/api/contacts?skip=0&limit=2&favorite=true
//  http://localhost:3000/api/contacts?skip=0&limit=2&sortField=favorite
//  http://localhost:3000/api/contacts?skip=0&limit=2&sortField=favorite&sortOrder=DESC

//* Доп. задание-2: Сделать фильтрацию контактов по полю избранного (GET /contacts?favorite=true)
//  http://localhost:3000/api/contacts?favorite=true



//? ------------------ HW-5 ------------------
//! serve static (app.js)
// GET  -->   http://localhost:3000/public
// GET  -->   http://localhost:3000/public/about.html
// GET  -->   http://localhost:3000/public/text.txt
// GET  -->   http://localhost:3000/api/files/download/My LOGO_74b3f8fd-5834-414a-ad39-a6f7761a1835.jpg
// GET  -->   http://localhost:3000/api/files/download/Country of Crimson Clouds.jpg

//! avatars
// GET  -->   http://localhost:3000/public/avatars/avatar-194938.png
// GET  -->   http://localhost:3000/public/avatars/avatar-805390.png
// GET  -->   http://localhost:3000/public/avatars/avatar-805428.png
// GET  -->   http://localhost:3000/public/avatars/avatar-5953714.png
// GET  -->   http://localhost:3000/public/avatars/man-6997508.png
// GET  -->   http://localhost:3000/public/avatars/monster-1459777.png
// GET  -->   http://localhost:3000/public/avatars/woman-6997660.png
// GET  -->   http://localhost:3000/public/avatars/avatar-Ruslan.jpg

// GET  -->   http://localhost:3000/avatars/monster-1459777.png
// GET  -->   http://localhost:3000/avatars/avatar-Ruslan.jpg

//! files/upload (filesRouter.js)
// POST  -->  http://localhost:3000/api/files/upload

//! files/download (filesRouter.js)
// USE  -->  http://localhost:3000/api/files/download/
// USE  -->  http://localhost:3000/api/files/download/My LOGO_74b3f8fd-5834-414a-ad39-a6f7761a1835.jpg
// USE  -->  http://localhost:3000/api/files/download/Country of Crimson Clouds.jpg

//! 6. Обновление аватарки (avatarURL) пользователя
// PATCH -- > http://localhost:3000/api/users/avatars


//? ------------------ HW-6 ------------------
//! 7. Верификация email пользователя
// GET -- > http://localhost:3000/api/users/verify/:verificationToken

//! 8. Добавление повторной отправки email пользователю с ссылкой для верификации
// POST -- > http://localhost:3000/api/users/verify
