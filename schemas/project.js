const Joi = require('joi');
const { Schema } = require('mongoose');
const { handleMongooseError } = require('../helpers');

//MONGOOSE SCHEMA (Обрабатывает то, что запишется в базу)
const projectMongooseSchema = new Schema(
  {
    link: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  },
  { versionKey: false, timestamps: true }
);

projectMongooseSchema.post('save', handleMongooseError);

// JOI SCHEMAS (Обрабатывает то, что идёт с frontend)
const projectSchema = Joi.object({
  link: Joi.string().uri().required(),
  name: Joi.string(),
  thumbnail: Joi.string().uri(),
  owner: Joi.string(),
});

module.exports = {
  projectMongooseSchema,
  projectSchema,
};
