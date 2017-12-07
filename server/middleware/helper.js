import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const signToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: '365d',
  });
};

export const setStatus = (res, message, code) => {
  return res.status(code).json(message);
};

export const validateSignUpForm = () => {
  return {
    firstName: 'required|alpha',
    lastName: 'required|alpha',
    email: 'required|email',
    bio: 'required',
    moniker: 'required',
    password: 'required|min:8',
  };
};

export const validateSignInForm = () => {
  return {
    email: 'required|email',
    password: 'required',
  };
};

export const validateReviews = () => {
  return {
    content: 'required',
  };
};
