// МЕТОДЫ РАБОТЫ С ДАННЫМИ В БАЗЕ
// GET find() вернёт все обьекты в коллекции
// GET findOne найдёт один по обьекту условий User.findOne({ _id: id, name: "Bob" })
// GET findById(id) - лучший (не нужно передавать обьект, а просто id)
// POST .create(req.body) создаст новый элемент коллекции
// PUT/PATCH findByIdAndUpdate(id, req.body, {new:true}) - обновление в базе данных получает id , обьект с настройками, 3-й параметр {new:true} возвращает обновлённый обьект
// DELETE findByIdAndDelete(id) или findByIdAndRemove(id) удаляет элемент коллекции по ID

const User = require('../models/user');

const { ctrlWrapper, HttpError, generateAvatar } = require('../helpers');

// GET ALL
const getAll = async (req, res) => {
  const result = await User.find({}, '-createdAt -updatedAt'); // .find отдаст все елементы из колекции со всеми полями кроме  createdAt и updatedAt
  res.json(result);
};

// GET USER BY ID
const getById = async (req, res) => {
  const { id } = req.params;
  const result = await User.findById(id, '-createdAt -updatedAt');
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

// ADD NEW USER
const add = async (req, res) => {
  if (!req.body.avatarUrl || req.body.avatarUrl.trim() === '') {
    req.body.avatarUrl = generateAvatar(req.body.email);
  }
  const result = await User.create(req.body); // .create создаёт новую запись
  res.status(201).json(result);
};

// UPDATE USER
const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await User.findByIdAndUpdate(id, req.body, { new: true }); // Обновляет по ID
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

// UPDATE VERIFYCATION
const updateVerify = async (req, res) => {
  const { id } = req.params;
  const result = await User.findByIdAndUpdate(id, req.body, { new: true }); // Обновляет по ID
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

// DELETE USER
const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await User.findByIdAndDelete(id); // logic;;
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    message: 'User successfully deleted',
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateVerify: ctrlWrapper(updateVerify),
  deleteById: ctrlWrapper(deleteById),
};
