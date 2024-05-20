const express = require('express');
const controller = require('../../controllers/users');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { registerJoiSchema, loginJoiSchema } = require('../../schemas/user');

const router = express.Router();

router.get('/', controller.getAll);

router.get('/:id', authenticate, isValidId, controller.getById);

router.post('/', authenticate, validateBody(registerJoiSchema), controller.add);

router.put('/:id', authenticate, isValidId, validateBody(registerJoiSchema), controller.updateById);

router.patch('/:id/verify', authenticate, isValidId, validateBody(loginJoiSchema), controller.updateVerify);

router.delete('/:id', authenticate, isValidId, controller.deleteById);

module.exports = router;
