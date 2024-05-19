const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

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

// REGISTRATION / SIGNOUT
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

  res.json({ token });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
