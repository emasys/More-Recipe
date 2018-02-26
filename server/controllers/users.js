import Validator from 'validatorjs';
import dotenv from 'dotenv';
import { Users } from '../models';
import {
  setStatus,
  validateSignInForm,
  validateSignUpForm,
  validateUpdateUser
} from '../middleware/helper';
import {
  createUser,
  AuthenticateUser,
  updateUserInfo,
  fetchUser,
  resetUserPassword,
  sendGeneratedToken,
  getGeneratedToken
} from '../services/user';

dotenv.config();

/**
 *
 * make class available
 * @export
 * @class
 */
export default class MoreRecipeUsers {
  /**
   *
   *
   * @param {object} req
   * @param {object} res
   * @returns {object}
   *
   * Create a new user and add into the database
   */
  static signUp(req, res) {
    const request = req.body;

    const validator = new Validator(request, validateSignUpForm());
    if (validator.fails()) {
      return setStatus(
        res,
        { success: false, status: validator.errors.all() },
        422
      );
    }
    if (request.confirmPassword !== request.password) {
      return setStatus(
        res,
        { success: false, status: "Your password didn't match" },
        422
      );
    }
    return createUser(res, request);
  }
  /**
   *
   *
   * @static
   * @param { object } req
   * @param { object } res
   * @returns {object} The list of all users in the database
   */
  static getUsers(req, res) {
    return Users.findAll({})
      .then(users => setStatus(res, { success: true, users }, 200))
      .catch(error => setStatus(res, { success: false, error }, 500));
  }
  /**
   *
   *
   * @static
   * @param { object } req
   * @param { object } res
   * @returns {object} a user profile
   */
  static getOneUser(req, res) {
    return fetchUser(res, req);
  }
  /**
   *
   *
   * @static
   * @param { object } req
   * @param { object } res
   * @returns {object} an updated user data if successful
   */
  static updateUser(req, res) {
    const request = req.body;
    const validator = new Validator(request, validateUpdateUser());
    if (validator.passes()) {
      return updateUserInfo(res, req, request);
    }
    // if validator returns false
    return setStatus(
      res,
      { success: false, status: validator.errors.all() },
      422
    );
  }
  /**
   *
   *
   * @static
   * @param { object } req
   * @param { object } res
   * @returns {object}
   *  Delete's user data from the database
   */
  static deleteUser(req, res) {
    return Users.findById(req.params.userId)
      .then(user =>
        user
          .destroy()
          .then(() =>
            setStatus(res, { success: true, status: 'user deleted' }, 200)))
      .catch(() =>
        setStatus(res, { success: false, error: 'user not found' }, 404));
  }
  /**
   *
   *
   * @static
   * @param { object } req
   * @param { object } res
   * @returns {object}
   * true and relevant user info, if a user successfully log's in
   */
  static signIn(req, res) {
    const request = req.body;
    const validator = new Validator(request, validateSignInForm());
    if (validator.fails()) {
      return setStatus(
        res,
        { success: false, status: validator.errors.all() },
        400
      );
    }
    return AuthenticateUser(res, request);
  }

  /**
   *
   *
   * @static
   * @param { object } req
   * @param { object } res
   * @returns {object}
   * true and relevant user info, if a user successfully log's in
   */
  static resetPassword(req, res) {
    const request = req.body;
    return resetUserPassword(res, request);
  }

  /**
   *
   *
   * @static
   * @param { object } req
   * @param { object } res
   * @returns {object}
   * add generated token to database
   */
  static sendToken(req, res) {
    const request = req.body;
    return sendGeneratedToken(res, request);
  }

  /**
   *
   *
   * @static
   * @param { object } req
   * @param { object } res
   * @returns {object}
   * fetch generated token from database
   */
  static getToken(req, res) {
    const request = req.body;
    return getGeneratedToken(res, request);
  }
}
