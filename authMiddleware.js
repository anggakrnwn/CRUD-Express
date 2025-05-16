require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('./user');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token tidak ditemukan' });

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
    req.user = await User.findByPk(payload.id);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token tidak valid' });
  }
};


authMiddleware.optional = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next();

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
    req.user = await User.findByPk(payload.id);
  } catch (err) {
    req.user = null;
  }
  next();
};

module.exports = authMiddleware;
