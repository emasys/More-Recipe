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
/**
 * validaates the fields below using validatorjs
 *
 * @returns error if all expectations are not satisfied
 */
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

/**
 * validaates the fields below using validatorjs
 *
 * @returns error if all expectations are not satisfied
 */
export const validateSignInForm = () => {
  return {
    email: 'required|email',
    password: 'required',
  };
};

/**
 * validates the field below using validatorjs
 *
 * @returns error if all expectations are not satisfied
 */
export const validateReviews = () => {
  return {
    content: 'required',
  };
};

/**
 * validates the fields below using validatorjs
 *
 * @returns error if all expectations are not satisfied
 */
export const validateAddRecipes = () => {
  return {
    name: 'required|alpha',
    direction: 'required',
    ingredients: 'required',
    description: 'required'
  };
};

/**
 * validates the fields below using validatorjs
 *
 * @returns error if all expectations are not satisfied
 */
export const validateUpdateUser = () => {
  return {
    firstName: 'required|alpha',
    lastName: 'required|alpha',
    bio: 'required'
  };
};

/**
 * sends a mail to the creator of the recipe if a new activity occurs eg: new reviews
 *
 * @returns error if all expectations are not satisfied
 */
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
    html: `${moniker} <b>${message} </b>` // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log(`Message sent: ${info.response}`);
  });
};

