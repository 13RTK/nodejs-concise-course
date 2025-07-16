import jwt from 'jsonwebtoken';
import AppError from './AppError.js';

const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(data) {
  const token = jwt.sign({ data }, JWT_SECRET);

  return token;
}

export function verifyToken(token) {
  try {
    jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new AppError(error.message || 'Invalid token', 401, error.name);
  }
}
