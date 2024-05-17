const express = require('express');
const controller = require('../../controllers/users');
const { validateBody } = require('../../middlewares');
const userSchema = require('../../schemas/user');

const router = express.Router();

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post('/', validateBody(userSchema), controller.add);

router.put('/:id', validateBody(userSchema), controller.updateById);

router.delete('/:id', controller.deleteById);

module.exports = router;
