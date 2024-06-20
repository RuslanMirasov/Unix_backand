const express = require('express');
// const moment = require('moment'); // работа с датой и временем
const cors = require('cors');
require('dotenv').config();

// Импорт всех маршрутов приложения
const authRouter = require('./routes/api/auth');
const usersRouter = require('./routes/api/users');
const projectsRouter = require('./routes/api/projects');
const tasksRouter = require('./routes/api/tasks');

// app настройки сервера
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Подключение всех маршрутов приложения
app.use(express.static('public'));
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/tasks', tasksRouter);

// Обработки ошибок
app.use(async (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(async (err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
