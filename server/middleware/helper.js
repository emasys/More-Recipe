import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

export const signToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: '365d',
  });
};
/**
 *
 *
 * @param {response} res
 * @param {object} message
 * @param {integer} code
 * @returns
 */
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
    country: 'required',
    avatar: 'required'
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

export const validateAddRecipes = () => {
  return {
    name: 'required',
    direction: 'required',
    ingredients: 'required',
    description: 'required'
  };
};

export const mailer = (moniker, email, message) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // setup e-mail data with unicode symbols
  const mailOptions = {
    from: 'MoreRecipe ✔ <more-recipe@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'Activity on your recipe', // Subject line
    text: `${moniker} ${message}`, // plaintext body
    html: `<b>${moniker} ${message} </b>` // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log(`Message sent: ${info.response}`);
  });
};

