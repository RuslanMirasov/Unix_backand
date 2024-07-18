const Session = require('../models/session');
const path = require('path');
const fs = require('fs');
const { ctrlWrapper, HttpError, cropVideo } = require('../helpers');

// GET ALL SESSIONS
const getAll = async (req, res) => {
  const { project } = req.query;
  const result = await Session.find({ project }).sort({ _id: -1 });
  if (!result) {
    throw HttpError(404);
  }

  const overall = result.length;

  // Подсчет сессий со статусом 'done'
  const success = result.filter(session => session.status === 'done').length || 0;

  // Подсчет процента успешных сессий
  const rate = `${((success / result.length) * 100).toFixed(1)}%` || '0%';

  // Вычисление среднего значения длительности
  const totalDuration = result.reduce((sum, session) => sum + session.duration, 0);
  const averageDuration = totalDuration / result.length;
  const minutes = Math.floor(averageDuration / 60000);
  const seconds = Math.floor((averageDuration % 60000) / 1000);
  const time = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}` || '00:00';

  res.json({
    overall,
    success,
    rate,
    time,
    collection: result,
  });
};

// GET SESSION BY ID
const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Session.findById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

// ADD NEW SESSION
const add = async (req, res) => {
  const result = await Session.create({ ...req.body });
  res.status(201).json(result);
};

// ADD VIDEO FROM CAMERA
const addVideo = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  const cameraDir = path.join(__dirname, '../', 'public/camera');
  const buffer = req.file.buffer;
  const outputPath = path.join(cameraDir, req.file.originalname);

  if (!fs.existsSync(cameraDir)) {
    fs.mkdirSync(cameraDir);
  }

  cropVideo(buffer, outputPath, 130, 185)
    .then(() => {
      req.processedVideoPath = outputPath;
      res.status(201).json({
        message: 'Видео успешно загружено в Firebase Storage',
        camera: `public/camera/${req.file.originalname}`,
      });
    })
    .catch(error => {
      res.status(500).send(`Error croping video: ${error.message}`);
    });
};

module.exports = {
  addVideo,
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
};
