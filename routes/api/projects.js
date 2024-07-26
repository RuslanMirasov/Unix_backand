const express = require('express');
const controller = require('../../controllers/projects');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { projectSchema, lastviewSchema, updateNameSchema } = require('../../schemas/project');

const router = express.Router();

router.get('/', authenticate, controller.getAll);

router.get('/:id', isValidId, controller.getById);

router.post('/', authenticate, validateBody(projectSchema), controller.add);

router.put('/:id', authenticate, isValidId, validateBody(projectSchema), controller.updateById);

router.put('/name/:id', isValidId, validateBody(updateNameSchema), controller.updateById);

router.put('/view/:id', isValidId, validateBody(lastviewSchema), controller.updateById);

router.delete('/:id', authenticate, isValidId, controller.deleteById);

module.exports = router;
