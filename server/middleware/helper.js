import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

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
    from: 'MoreRecipe <morerecipe23@gmail.com>',
    // list of receivers
    to: email,
    // Subject line
    subject: '[Alert] MoreRecipe',
    // plaintext body
    // text: `${moniker} ${message}`,
    // html body
    html: `
    <p>
    <img src="https://res.cloudinary.com/emasys/image/upload/v1516439649/mR_2_jwnuce.png" width="120" height="120" alt="logo"/>
    </p>
    <h4>${moniker} <b>${message} </b></h4>
    `
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // eslint-disable-next-line
      return console.log(error);
    }
    // eslint-disable-next-line
    console.log(`Message sent: ${info.response}`);
  });
};
