const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');

const tempDir = path.join(__dirname, '../', 'temp');
const avatarDir = path.join(__dirname, '../', 'public', 'avatars'); //путь к папке куда я буду сохранять картинки

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (_, file, cd) => {
    cd(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
