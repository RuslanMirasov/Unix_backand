const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

//всё для аватарки---------------------------------------
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const avatarDir = path.join(__dirname, '../', 'public', 'avatars');
//-------------------------------------------------------

const User = require('../models/user');

const { ctrlWrapper, HttpError, generateAvatar } = require('../helpers');

// REGISTRATION / SIGNOUT
const register = async (req, res) => {
  const { email, password, avatarUrl } = req.body;

  //проверяем, есть ли такой email в базе
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email already in use!');
  }

  //генерируем аватарку по умолчанию, если пользователь не передал
  const avatar = !avatarUrl || avatarUrl.trim() === '' ? generateAvatar(email) : avatarUrl;

  //хешируем пароль перед записью в базу
  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({ ...req.body, avatarUrl: avatar, password: hashPassword });
  res.status(201).json(result);
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or Password invalid!');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or Password invalid!');
  }

  //генерируем JWT token
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      subscribe: user.subscribe,
    },
  });
};

// GET CURRENT USER
const getCurrent = async (req, res) => {
  const { email, name, avatarUrl, subscribe } = req.user;
  res.json({
    name,
    email,
    avatarUrl,
    subscribe,
  });
};

//LOGOUT
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.json({ message: 'Logout success' });
};

//CHANGE AVATAR
const changeAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const extension = path.extname(originalname);
  const filename = `avatar_${_id}${extension}`;
  const resultUpload = path.join(avatarDir, filename);

  try {
    // Удаляем старый аватар, если существует
    await removeOldAvatar(_id);

    // Обрабатываем и сохраняем новое изображение
    await processAndSaveImage(tempUpload, resultUpload);

    // Обновляем URL-адрес аватара в базе данных
    const timestamp = Date.now();
    const avatarUrl = `${path.join('avatars', filename)}?v=${timestamp}`;
    await User.findByIdAndUpdate(_id, { avatarUrl });

    // Удаляем временный файл
    await fs.unlink(tempUpload);

    res.json({ avatarUrl });
  } catch (error) {
    console.error('Error changing avatar:', error);
    res.status(500).send('Error changing avatar');
  }
};

const removeOldAvatar = async userId => {
  try {
    const files = await fs.readdir(avatarDir);
    const userAvatarPattern = new RegExp(`^avatar_${userId}\\..*`);

    for (const file of files) {
      if (userAvatarPattern.test(file)) {
        await fs.unlink(path.join(avatarDir, file));
      }
    }
  } catch (error) {
    console.error('Error removing old avatar:', error);
  }
};

const processAndSaveImage = async (inputPath, outputPath) => {
  try {
    const image = await Jimp.read(inputPath);
    await image.cover(300, 300).writeAsync(outputPath);
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  changeAvatar: ctrlWrapper(changeAvatar),
};
