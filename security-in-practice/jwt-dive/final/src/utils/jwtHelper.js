// import jwt from 'jsonwebtoken';
import * as jose from 'jose';
import AppError from './AppError.js';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function generateToken(data) {
  // jsonwebtoken version
  // const token = jwt.sign({ data }, JWT_SECRET, { expiresIn: '20s' });

  // Jose version
  const token = await new jose.SignJWT({ data })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('20s')
    .sign(JWT_SECRET);

  return token;
}

export async function verifyToken(token) {
  try {
    // jsonwebtoken version
    // jwt.verify(token, JWT_SECRET);

    // Jose version
    await jose.jwtVerify(token, JWT_SECRET);
  } catch (error) {
    throw new AppError(error.message || 'Invalid token', 401, error.name);
  }
}
