import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import log from 'fancy-log';
import emailTemplate from '../email-template/index.js';

dotenv.config();

export const signToken = data =>
  jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: '365d'
  });
/**
 *
 *
 * @param {response} res
 * @param {object} message
 * @param {integer} code
 * @returns {object} statusCode and message
 */
export const setStatus = (res, message, code) => res.status(code).json(message);
/**
 * validaates the fields below using validatorjs
 *
 * @returns {object} error if all expectations are not satisfied
 */
export const validateSignUpForm = () => ({
  email: 'required|email',
  moniker: ['required', 'regex:/^[a-z0-9]+$/i'],
  password: 'required|min:8',
  confirmPassword: 'required'
});

/**
 * validaates the fields below using validatorjs
 *
 * @returns {object} error if all expectations are not satisfied
 */
export const validateSignInForm = () => ({
  email: 'required|email',
  password: 'required'
});

/**
 * validates the field below using validatorjs
 *
 * @returns {object} error if all expectations are not satisfied
 */
export const validateReviews = () => ({
  content: 'required'
});

/**
 * validates the fields below using validatorjs
 *
 * @returns {object} error if all expectations are not satisfied
 */
export const validateAddRecipes = () => ({
  name: 'required',
  direction: 'required',
  ingredients: 'required',
  description: 'required'
});

/**
 * validates the fields below using validatorjs
 *
 * @returns {object} error if all expectations are not satisfied
 */
export const validateUpdateUser = () => ({
  firstName: 'alpha',
  lastName: 'alpha'
});

/**
 * sends a mail to the creator of the recipe if a
 * new activity occurs eg: new reviews
 * @param {string} moniker
 * @param {string} email
 * @param {string} message
 * @returns {object} error if all expectations are not satisfied
 */
export const mailer = (moniker = null, email, message) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // setup e-mail data
  const mailOptions = {
    // sender address
    from: 'MoreRecipes <morerecipe23@gmail.com>',
    to: email,
    subject: 'MoreRecipes notifications',
    html: emailTemplate(moniker, message)
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // eslint-disable-next-line
      return log(error);
    }
    // eslint-disable-next-line
    log(`Message sent: ${info.response}`);
  });
};

export const notFoundDispatcher = res =>
  setStatus(res, { success: false, message: 'Not found' }, 404);

export const serverErrorDispatcher = (res, error = null) =>
  setStatus(res, { success: false, error: error.message }, 500);
