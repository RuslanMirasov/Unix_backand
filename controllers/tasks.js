const Task = require('../models/task');
const Project = require('../models/project');

const { ctrlWrapper, HttpError } = require('../helpers');

// GET ALL TASKS
const getAll = async (req, res) => {
  const { project } = req.query;
  const result = await Task.find({ project }).sort({ _id: 1 });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

// GET PROJECT BY ID
const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

// ADD NEW TASK
const add = async (req, res) => {
  const { project } = req.body;

  const projectExist = await Project.findById(project);
  if (!projectExist) {
    throw HttpError(404, `There is no project with such ID`);
  }

  const { _id: owner } = req.user;
  const result = await Task.create({ ...req.body, owner });
  res.status(201).json(result);
};

// UPDATE TASK
const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findByIdAndUpdate(id, req.body, { new: false });
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    message: 'Task successfully updated',
  });
};

// DELETE TASK
const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    message: 'Project successfully deleted',
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
