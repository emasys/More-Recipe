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
    moniker: ['required', 'regex:/^[a-z0-9]+$/i'],
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
    firstName: 'alpha',
    lastName: 'alpha',
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

  // setup e-mail data
  const mailOptions = {
    from: 'MoreRecipe <more-recipe@gmail.com>', // sender address
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

// To be implemented later
// export const voter = (decoded, activeKey, nonactive, recipe) => {
//   if (decoded) {
//     activeKey = recipe.reactionDown;
//     nonactive = recipe.reactionDown;
//     if (activeKey.indexOf(Number(decoded)) !== -1) {
//       // have downvoted
//       const removeId = activeKey.indexOf(Number(decoded));
//       if (removeId > -1) {
//         activeKey.splice(removeId, 1);
//       }
//       return recipe
//         .update({
//           downvote: recipe.downvote - 1,
//           reactionDown: recipe.reactionDown,
//         })
//         .then(() => setStatus(res, { success: true, recipe }, 200)); // Send back the updated recipe.
//     } else if (
//       reactionDown.indexOf(Number(req.decoded.id)) === -1 &&
//       reactionUp.indexOf(Number(req.decoded.id)) !== -1
//     ) {
//       // already upvoted but not downvoted
//       const removeId = reactionUp.indexOf(Number(req.decoded.id));
//       if (removeId > -1) {
//         reactionUp.splice(removeId, 1);
//       }
//       recipe.reactionDown.push(req.decoded.id);
//       return recipe
//         .update({
//           upvote: recipe.upvote - 1,
//           downvote: recipe.downvote + 1,
//           reactionDown: recipe.reactionDown,
//           reactionUp,
//         })
//         .then(() => setStatus(res, { success: true, recipe }, 200)); // Send back the updated recipe.
//     }
//     // if a user has not downvoted or upvoted then increment downvote count
//     // and add userId into the reactionDown array
//     recipe.reactionDown.push(req.decoded.id);
//     return recipe
//       .update({
//         downvote: recipe.downvote + 1,
//         reactionDown: recipe.reactionDown,
//       })
//       .then(() => setStatus(res, { success: true, recipe }, 200)); // Send back the updated recipe.
//   }
// };

