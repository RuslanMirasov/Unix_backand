const express = require('express');
const controller = require('../../controllers/auth');
const { validateBody, authenticate, upload } = require('../../middlewares');
const { registerSchema, loginSchema } = require('../../schemas/user');

const router = express.Router();

router.post('/register', validateBody(registerSchema), controller.register);

router.post('/login', validateBody(loginSchema), controller.login);

router.post('/logout', authenticate, controller.logout);

router.get('/current', authenticate, controller.getCurrent);

router.patch('/avatar', authenticate, upload.single('avatar'), controller.changeAvatar);

router.patch('/update', authenticate, controller.updateUser);

module.exports = router;
