const multer = require('multer');

const memoryStorage = multer.memoryStorage();

const uploadVideo = multer({ storage: memoryStorage });

module.exports = uploadVideo;
