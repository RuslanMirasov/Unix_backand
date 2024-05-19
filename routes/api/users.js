const express = require('express');
const controller = require('../../controllers/users');
const { validateBody, isValidId } = require('../../middlewares');
const { userJoiSchema, userJoiVerifySchema } = require('../../schemas/user');

const router = express.Router();

router.get('/', controller.getAll);

router.get('/:id', isValidId, controller.getById);

router.post('/', validateBody(userJoiSchema), controller.add);

router.put('/:id', isValidId, validateBody(userJoiSchema), controller.updateById);

router.patch('/:id/verify', isValidId, validateBody(userJoiVerifySchema), controller.updateVerify);

router.delete('/:id', isValidId, controller.deleteById);

module.exports = router;
