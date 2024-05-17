const express = require('express'); // импортируем express
const moment = require('moment'); // работа с датой и временем
const fs = require('fs/promises'); // работа с файловой системой
const cors = require('cors'); // работа с CORS запросами

const usersRouter = require('./routes/api/users');

const app = express(); // app = веб сервер

app.use(cors());

app.use(async (req, _, next) => {
  const { method, url } = req;
  const date = moment().format('DD-MM-YYYY hh:mm:ss');
  await fs.appendFile('./public/server.log', `\n${method} ${url} ${date}`);
  next();
});

app.use('/api/users', usersRouter);

app.use(async (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(async (err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

// Запуск web сервера на порте 7777
app.listen(3000, () => {
  console.log('Server running');
});
