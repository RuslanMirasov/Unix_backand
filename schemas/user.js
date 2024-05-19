const Joi = require('joi');
const { Schema } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//MONGOOSE SCHEMA (Обрабатывает то, что запишется в базу)
const userMongooseSchema = new Schema(
  {
    name: {
      type: String,
      default: 'New User',
    },
    email: {
      type: String,
      match: emailRegExp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userMongooseSchema.post('save', handleMongooseError);

// JOI SCHEMAS (Обрабатывает то, что идёт с frontend)
const registerSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(new RegExp(emailRegExp)).messages({
    'string.pattern.base': 'Wrong email format!',
  }),
  password: Joi.string().min(6).pattern(new RegExp('(?=.*[0-9])(?=.*[A-Z])')).required().messages({
    'string.min': 'Password must be at least 6 characters long.',
    'string.pattern.base': 'Password must contain numbers and uppercase letters.',
    'any.required': 'Password is a required field.',
  }),
  avatarUrl: Joi.string().uri(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(emailRegExp)).messages({
    'string.pattern.base': 'Wrong email format!',
  }),
  password: Joi.string().min(6).pattern(new RegExp('(?=.*[0-9])(?=.*[A-Z])')).required().messages({
    'string.min': 'Password must be at least 6 characters long.',
    'string.pattern.base': 'Password must contain numbers and uppercase letters.',
    'any.required': 'Password is a required field.',
  }),
});

module.exports = {
  userMongooseSchema,
  registerSchema,
  loginSchema,
};
