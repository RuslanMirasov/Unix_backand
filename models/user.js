const { model } = require('mongoose');
const { userMongooseSchema } = require('../schemas/user');

const User = model('user', userMongooseSchema);

module.exports = User;
