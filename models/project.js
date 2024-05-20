const { model } = require('mongoose');
const { projectMongooseSchema } = require('../schemas/project');

const Project = model('project', projectMongooseSchema);

module.exports = Project;
