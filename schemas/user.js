const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string()
    .pattern(new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
    .messages({
      'string.pattern.base': 'Wrong email format!',
    }),
  password: Joi.string().min(6).pattern(new RegExp('(?=.*[0-9])(?=.*[A-Z])')).required().messages({
    'string.min': 'Password must be at least 6 characters long.',
    'string.pattern.base': 'Password must contain numbers and uppercase letters.',
    'any.required': 'Password is a required field.',
  }),
  avatarUrl: Joi.string().uri().optional().allow(''),
});

module.exports = userSchema;
