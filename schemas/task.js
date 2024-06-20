const Joi = require('joi');
const { Schema } = require('mongoose');
const { handleMongooseError } = require('../helpers');

//MONGOOSE SCHEMA (Обрабатывает то, что запишется в базу)
const taskMongooseSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    project: { type: String, required: true },
    device: { type: String, enum: ['app', 'browser'], required: true },
    name: { type: String, required: true },
    number: { type: Number, required: true },
    target: { type: String, required: true },
    description: { type: String, default: '' },
    proto: { type: String, default: '' },
  },
  { versionKey: false, timestamps: false }
);

taskMongooseSchema.post('save', handleMongooseError);

// JOI SCHEMAS (Обрабатывает то, что идёт с frontend)
const taskSchema = Joi.object({
  owner: Joi.string(),
  project: Joi.string().required(),
  device: Joi.string().valid('app', 'browser').required(),
  name: Joi.string().required(),
  number: Joi.number().required(),
  target: Joi.string().uri().required(),
  description: Joi.string().allow(''),
  proto: Joi.string().allow(''),
});

// UPDATE NAME
const nameSchema = Joi.object({
  name: Joi.string().required(),
});

// UPDATE DEVICE
const deviceSchema = Joi.object({
  device: Joi.string().valid('app', 'browser').required(),
});

// UPDATE PROTO
const protoSchema = Joi.object({
  proto: Joi.string().uri().required(),
});

// UPDATE DESCRIPTION
const descriptionSchema = Joi.object({
  description: Joi.string().required(),
});

module.exports = {
  taskMongooseSchema,
  taskSchema,
  nameSchema,
  deviceSchema,
  protoSchema,
  descriptionSchema,
};
