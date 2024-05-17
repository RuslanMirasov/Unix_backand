const { ctrlWrapper, HttpError } = require('../helpers');

const users = require('../models/users');

// const Joi = require('joi');
// const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// const addSchema = Joi.object({
//   name: Joi.string(),
//   email: Joi.string().pattern(emailRegExp).messages({ 'string.pattern.base': 'Wrong email format!' }),
//   password: Joi.string().min(6).pattern(new RegExp('(?=.*[0-9])(?=.*[A-Z])')).required().messages({
//     'string.min': 'Password must be at least 6 characters long.',
//     'string.pattern.base': 'Password must contain numbers and uppercase letters.',
//     'any.required': 'Password is a required field.',
//   }),
//   avatarUrl: Joi.string().uri().optional().allow(''),
// });

const getAll = async (req, res) => {
  const result = await users.getAll();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await users.getById(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const add = async (req, res) => {
  //   const { error } = addSchema.validate(req.body);
  //   if (error) {
  //     throw HttpError(400, error.message);
  //   }
  const result = await users.addNew(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  //   const { error } = addSchema.validate(req.body);
  //   if (error) {
  //     throw HttpError(400, error.message);
  //   }
  const { id } = req.params;
  const result = await users.updateById(id, req.body);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await users.deleteById(id);
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
