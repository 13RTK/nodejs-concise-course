import AppError from '../utils/AppError.js';
import {
  createUser as createUserApi,
  verifyUser,
} from '../services/userService.js';
import { sendSuccessResponse } from '../utils/responseHelper.js';
import { generateToken } from '../utils/jwtHelper.js';

export async function createUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(`Email and password are required`, 400, 'Bad request');
  }

  const createdUser = await createUserApi(email, password);

  return sendSuccessResponse(res, createdUser);
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(`Email and password are required`, 400, 'Bad request');
  }

  console.log(email, password);
  const result = await verifyUser(email, password);

  if (!result) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const token = await generateToken({ email });

  return sendSuccessResponse(res, token);
}
