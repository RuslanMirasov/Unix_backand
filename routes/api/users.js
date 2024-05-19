const express = require('express');
const controller = require('../../controllers/users');
const { validateBody, isValidId } = require('../../middlewares');
const { registerJoiSchema, loginJoiSchema } = require('../../schemas/user');

const router = express.Router();

router.get('/', controller.getAll);

router.get('/:id', isValidId, controller.getById);

router.post('/', validateBody(registerJoiSchema), controller.add);

router.put('/:id', isValidId, validateBody(registerJoiSchema), controller.updateById);

router.patch('/:id/verify', isValidId, validateBody(loginJoiSchema), controller.updateVerify);

router.delete('/:id', isValidId, controller.deleteById);

module.exports = router;
