const express = require('express');
const controller = require('../../controllers/sessions');
const { validateBody, uploadVideo } = require('../../middlewares');
const { sessionSchema } = require('../../schemas/session');

const router = express.Router();

router.get('/', controller.getAll);

router.post('/', validateBody(sessionSchema), controller.add);

router.post('/video', uploadVideo.single('file'), controller.addVideo);

module.exports = router;
