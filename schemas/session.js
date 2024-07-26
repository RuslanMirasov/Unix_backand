const Joi = require('joi');
const { Schema } = require('mongoose');
const { handleMongooseError } = require('../helpers');

//MONGOOSE SCHEMA (Обрабатывает то, что запишется в базу)
const sessionMongooseSchema = new Schema(
  {
    duration: {
      type: Number,
      required: true,
    },
    user: {
      email: {
        type: String,
        required: true,
      },
      avatarUrl: {
        type: String,
        required: true,
      },
    },
    task: {
      id: {
        type: String,
        required: true,
      },
      number: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      device: { type: String, enum: ['app', 'browser'], required: true },
      description: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      default: null,
    },
    camera: {
      type: String,
      required: true,
    },
    project: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

sessionMongooseSchema.post('save', handleMongooseError);

// JOI SCHEMAS (Обрабатывает то, что идёт с frontend)
const sessionSchema = Joi.object({
  duration: Joi.number().required(),
  user: Joi.object({
    email: Joi.string().email().required(),
    avatarUrl: Joi.string().required(),
  }).required(),
  task: Joi.object({
    id: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    device: Joi.string().valid('app', 'browser').required(),
    description: Joi.string().required(),
  }).required(),
  status: Joi.string().required(),
  video: Joi.string().allow(null).default(null),
  camera: Joi.string().required(),
  project: Joi.string().required(),
});

module.exports = {
  sessionMongooseSchema,
  sessionSchema,
};
