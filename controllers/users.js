const { ctrlWrapper, HttpError } = require('../helpers');

const users = require('../models/users');

// GET ALL
const getAll = async (req, res) => {
  const result = await users.getAll(); // logic;
  res.json(result);
};

// GET USER BY ID
const getById = async (req, res) => {
  const { id } = req.params;
  const result = await users.getById(id); // logic;;
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

// ADD NEW USER
const add = async (req, res) => {
  const result = await users.addNew(req.body); // logic;;
  res.status(201).json(result);
};

// UPDATE USER
const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await users.updateById(id, req.body); // logic;;
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

// DELETE USER
const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await users.deleteById(id); // logic;;
  if (!result) {
    throw HttpError(404, 'Not found');
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
  deleteById: ctrlWrapper(deleteById),
};
