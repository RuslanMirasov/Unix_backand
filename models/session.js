const { model } = require('mongoose');
const { sessionMongooseSchema } = require('../schemas/session');

const Session = model('session', sessionMongooseSchema);

module.exports = Session;
