const express = require('express');
const controller = require('../../controllers/tasks');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { taskSchema, nameSchema, deviceSchema, protoSchema, descriptionSchema } = require('../../schemas/task');

const router = express.Router();

router.get('/', controller.getAll);

router.get('/:id', isValidId, controller.getById);

router.post('/', authenticate, validateBody(taskSchema), controller.add);

router.put('/:id', authenticate, isValidId, validateBody(taskSchema), controller.updateById);

router.put('/name/:id', authenticate, isValidId, validateBody(nameSchema), controller.updateById);
router.put('/device/:id', authenticate, isValidId, validateBody(deviceSchema), controller.updateById);
router.put('/proto/:id', authenticate, isValidId, validateBody(protoSchema), controller.updateById);
router.put('/description/:id', authenticate, isValidId, validateBody(descriptionSchema), controller.updateById);

router.delete('/:id', authenticate, isValidId, controller.deleteById);

module.exports = router;
