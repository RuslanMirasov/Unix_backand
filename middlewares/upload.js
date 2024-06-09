const multer = require('multer');
const path = require('path');
const mime = require('mime-types');

const tempDir = path.join(__dirname, '../', 'temp');

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (_, file, cd) => {
    cd(null, file.originalname);
  },
});

// Добавление проверки типа файла и ограничения размера
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const mimeType = mime.lookup(file.originalname);
  const fileSize = parseInt(req.headers['content-length']);

  if (!allowedTypes.includes(mimeType)) {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.'));
  } else if (fileSize > 3 * 1024 * 1024) {
    // 3 MB
    cb(new Error('File size exceeds the limit of 3MB.'));
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: multerConfig,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, // Ограничение размера файла 3 MB
});

module.exports = upload;
