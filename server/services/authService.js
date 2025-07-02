const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async ({ userName, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ userName, email, password: hashedPassword });
  return user;
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid password");

  const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1d' });
  return { user, token };
};
