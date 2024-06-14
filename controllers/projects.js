const Project = require('../models/project');

const { ctrlWrapper, HttpError, fetchMetadata } = require('../helpers');

// GET ALL PROJECTS
const getAll = async (req, res) => {
  const { _id: owner } = req.user; // получаем данные о пользователе из поля owner в коллекции
  const { page = 1, limit = 9, q, sort } = req.query; //получаем запросы из адресной строки ?page=1&limit=10
  const skip = (page - 1) * limit;
  const query = { owner };

  //Поиск
  if (q) {
    query.name = { $regex: q, $options: 'i' };
  }

  //Сортировка
  let sortObject = { _id: -1 };
  if (sort) {
    const [sortField, sortOrder] = sort.split('_');
    sortObject = { [sortField]: sortOrder === 'desc' ? -1 : 1 }; // asc/desc
  }

  const result = await Project.find(query)
    .sort(sortObject)
    .skip(skip)
    .limit(parseInt(limit))
    .populate('owner', '_id');
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
  const { link } = req.body;
  const { _id: owner } = req.user;

  const project = await Project.findOne({ link });
  if (project) {
    throw HttpError(409, 'Project already exist');
  }

  const metadata = await fetchMetadata(link).then(metadata => {
    if (!metadata) {
      throw HttpError(400, 'Link is not valid');
    }
    return {
      name: metadata.title,
      thumbnail: metadata.image,
    };
  });
  const result = await Project.create({ ...req.body, ...metadata, owner });
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
