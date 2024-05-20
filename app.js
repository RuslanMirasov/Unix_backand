const express = require('express'); // импортируем express
const path = require('path');
// const moment = require('moment'); // работа с датой и временем
const fs = require('fs/promises'); // работа с файловой системой
const cors = require('cors'); // работа с CORS запросами
require('dotenv').config(); // Добавляем секретные данные в .env

const authRouter = require('./routes/api/auth'); // подключаем USERS из routes/api
const usersRouter = require('./routes/api/users'); // подключаем USERS из routes/api
const projectsRouter = require('./routes/api/projects'); // подключаем PROJECTS из routes/api

// app настройки
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Подключение всех маршрутов приложения
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/projects', projectsRouter);

// Обработки ошибок
app.use(async (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(async (err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
