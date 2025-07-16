import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

export async function createUser(email, password) {
  const encryptedPassword = await bcrypt.hash(password, 10);

  const createdUser = await User.create({
    id: Date.now(),
    email,
    password: encryptedPassword,
  });

  return createdUser;
}

export async function verifyUser(email, password) {
  const user = await User.findOne({ where: { email } });
  const result = await bcrypt.compare(password, user.password);

  return result;
}
