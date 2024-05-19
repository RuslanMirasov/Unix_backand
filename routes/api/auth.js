const express = require('express');
const controller = require('../../controllers/auth');
const { validateBody, isValidId } = require('../../middlewares');
const { registerSchema, loginSchema } = require('../../schemas/user');

const router = express.Router();

// register / signup
router.post('/register', validateBody(registerSchema), controller.register);

// login
router.post('/login', validateBody(loginSchema), controller.login);

module.exports = router;
