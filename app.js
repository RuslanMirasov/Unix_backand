const express = require('express'); // импортируем express
const moment = require('moment'); // работа с датой и временем
const fs = require('fs/promises'); // работа с файловой системой
const cors = require('cors'); // работа с CORS запросами

const usersRouter = require('./routes/api/users'); // подключаем USERS из routes/api
const app = express(); // app = веб сервер

// Middleware для разбора JSON и URL-кодированных данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); //Настройка кроссдоменных запросов CORS

//Записываем каждый HTTP запрос в файл public/server.log
app.use(async (req, _, next) => {
  const { method, url } = req;
  const date = moment().format('DD-MM-YYYY hh:mm:ss');
  await fs.appendFile('./public/server.log', `\n${method} ${url} ${date}`);
  next();
});

// Подключение всех маршрутов приложения
app.use('/api/users', usersRouter);

// Обработки ошибок
app.use(async (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(async (err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

// Запуск web сервера на порте 7777
const PORT = 7777;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
