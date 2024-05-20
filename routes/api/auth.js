const express = require('express');
const controller = require('../../controllers/auth');
const { validateBody, authenticate } = require('../../middlewares');
const { registerSchema, loginSchema } = require('../../schemas/user');

const router = express.Router();

router.post('/register', validateBody(registerSchema), controller.register);

router.post('/login', validateBody(loginSchema), controller.login);

router.post('/logout', authenticate, controller.logout);

router.get('/current', authenticate, controller.getCurrent);

module.exports = router;
