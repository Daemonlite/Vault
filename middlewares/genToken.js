const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const secretKey = process.env.SECRET;

const generateAccessToken = (userId) => {
  const user = User.find({ _id: userId });

  const payload = { 
    userId: user._id,
    username: user.username,
    email: user.email,
    fullname: user.fullname,
    isAdmin: user.isAdmin,
    email_verified:user.email_verified
  };
  const options = { expiresIn: '15m' }

  return jwt.sign(payload, secretKey, options);
};


const generateRefreshToken = (userId) => {
    const user = User.find({ _id: userId });
    const payload = { 
        userId: user._id,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        isAdmin: user.isAdmin,
        email_verified:user.email_verified
      };
  const options = { expiresIn: '7d' }

  return jwt.sign(payload, secretKey, options);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
