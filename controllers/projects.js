const Project = require('../models/project');

const { ctrlWrapper, HttpError, fetchMetadata } = require('../helpers');

// GET ALL PROJECTS
const getAll = async (req, res) => {
  const { _id: owner } = req.user; // получаем данные о пользователе из поля owner в коллекции
  const { page = 1, limit = 30 } = req.query; //получаем запросы из адресной строки ?page=1&limit=10
  const skip = (page - 1) * limit;
  const result = await Project.find({ owner })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('owner', '-createdAt -updatedAt'); // метод позволяет получить не только id а все данные хозяина проекта
  res.json(result);
};

// GET PROJECT BY ID
const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Project.findById(id, '-createdAt -updatedAt');
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

// ADD NEW PROJECT
const add = async (req, res) => {
  const url = 'https://mirasov.dev/';

  const result = await fetchMetadata(url).then(metadata => {
    return {
      name: metadata.title,
      thumbnail: metadata.image,
    };
  });
  res.json(result);
};

// UPDATE PROJECT
const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Project.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

// DELETE PROJECT
const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Project.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    message: 'Project successfully deleted',
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
