const express = require('express');
const Joi = require('joi');

const users = require('../../models/users');

const { HttpError } = require('../../helpers');

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  avatarUrl: Joi.string().required(),
});

router.get('/', async (_, res) => {
  try {
    const result = await users.getAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
    });
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await users.getById(id);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

const vasya = {
  name: 'Василий',
  email: 'alibabaev@gmail.com',
  password: 'QWERTmnbvc100@',
  avatarUrl: 'https://i.pravatar.cc/450?img=3',
};

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await users.addNew(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', (req, res, next) => {
  try {
    const { error } = addSchema.validate(vasya);
    if (error) {
      throw HttpError(400, error.message);
    }
  } catch (error) {
    next(error);
  }
});

// router.delete('/:id', (_, res) => {
//   res.json(users[0]);
// });

module.exports = router;
