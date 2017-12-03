import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const signToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: '365d',
  });
};

export const setStatus = (res, message, code) => {
  console.log('reached');
  return res.status(code).json(message);
};
