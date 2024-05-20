const express = require('express');
const controller = require('../../controllers/projects');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { projectSchema } = require('../../schemas/project');

const router = express.Router();

router.get('/', authenticate, controller.getAll);

router.get('/:id', authenticate, isValidId, controller.getById);

router.post('/', authenticate, validateBody(projectSchema), controller.add);

router.put('/:id', authenticate, isValidId, validateBody(projectSchema), controller.updateById);

router.delete('/:id', authenticate, isValidId, controller.deleteById);

module.exports = router;
