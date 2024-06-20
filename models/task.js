const { model } = require('mongoose');
const { taskMongooseSchema } = require('../schemas/task');

const Task = model('task', taskMongooseSchema);

module.exports = Task;
