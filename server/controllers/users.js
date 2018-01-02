import _ from 'lodash';
import Validator from 'validatorjs';
import dotenv from 'dotenv';
import { Users, TokenGen } from '../models';
import {
  setStatus,
  signToken,
  validateSignInForm,
  validateSignUpForm,
  validateUpdateUser,
  mailer
} from '../middleware/helper';

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
    if (validator.passes()) {
      if (request.confirmPassword !== request.password) {
        return setStatus(
          res,
          { success: false, status: "Your password didn't match" },
          422
        );
      }
      Users.findOne({
        where: { email: request.email }
      })
        .then((user) => {
          if (user) {
            return setStatus(
              res,
              {
                success: false,
                target: 'email',
                status: 'email already exist in our database'
              },
              409
            );
          }

          Users.findOne({
            where: { moniker: request.moniker }
          })
            .then((username) => {
              if (username) {
                return setStatus(
                  res,
                  {
                    success: false,
                    target: 'moniker',
                    status: 'moniker already exist in our database'
                  },
                  409
                );
              }
              Users.create(request)
                .then((newUser) => {
                  const data = _.pick(newUser, ['id', 'moniker', 'avatar']);
                  const token = signToken(data);
                  return setStatus(
                    res,
                    { success: true, user: data, token },
                    201
                  );
                })
                .catch(() =>
                  setStatus(
                    res,
                    { success: false, error: 'record not saved' },
                    400
                  ));
            })
            .catch(() =>
              setStatus(
                res,
                {
                  success: false,
                  error: 'record not saved'
                },
                500
              ));
        })
        .catch(() =>
          setStatus(res, { success: false, error: 'record not saved' }, 500));
    } else {
      return setStatus(
        res,
        { success: false, status: validator.errors.all() },
        422
      );
    }
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
    return Users.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return setStatus(
            res,
            { success: false, message: 'User not found' },
            404
          );
        }
        const data = _.pick(user, [
          'id',
          'firstName',
          'lastName',
          'bio',
          'email',
          'country',
          'avatar',
          'moniker'
        ]);
        return setStatus(res, { success: true, data }, 200);
      })
      .catch(error => setStatus(res, { success: false, error }, 500));
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
      return Users.findById(req.params.userId)
        .then(user =>
          user
            .update({
              firstName: request.firstName || user.firstName,
              lastName: request.lastName || user.lastName,
              bio: request.bio || user.bio,
              avatar: request.avatar || user.avatar
            })
            .then(() =>
              setStatus(res, { success: true, status: 'updated', user }, 200)))
        .catch(() =>
          setStatus(res, { success: false, error: 'user not found' }, 404));
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
    Users.findOne({ where: { email: request.email } })
      .then((user) => {
        if (!user) {
          return setStatus(
            res,
            { success: false, status: 'user not found' },
            404
          );
        }
        if (!user.comparePassword(user, request.password)) {
          return setStatus(
            res,
            { success: false, status: 'Invalid email/password' },
            400
          );
        }
        const payload = _.pick(user, ['id', 'moniker', 'avatar']);
        const token = signToken(payload);
        return setStatus(res, { success: true, token }, 200);
      })
      .catch(() =>
        setStatus(res, { success: false, status: 'Server error' }, 500));
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
    Users.findOne({ where: { email: request.email } })
      .then((user) => {
        if (!user) {
          return setStatus(
            res,
            { success: false, status: 'user not found' },
            404
          );
        }
        user
          .update({
            password: request.password
          })
          .then(() =>
            setStatus(res, { success: true, status: 'updated' }, 200));
      })
      .catch(() =>
        setStatus(res, { success: false, error: 'server error' }, 500));
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
    let token = null;
    TokenGen.findOne({ where: { email: request.email } }).then((user) => {
      token = Math.floor(1000 + (Math.random() * 9000));
      request.token = token;
      if (!user) {
        TokenGen.create(request).then((newuser) => {
          setStatus(res, { success: true, status: 'token sent' }, 200);
          return mailer('Reset password Token:', newuser.email, token);
        });
      }
      user
        .update({
          token: token || user.token
        })
        .then(() => {
          setStatus(res, { success: true, status: 'token sent' }, 200);
          return mailer('Reset password Token:', user.email, token);
        });
    });
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
    TokenGen.findOne({ where: { email: request.email, token: request.token } })
      .then((user) => {
        if (!user) return setStatus(res, { success: false }, 404);
        return setStatus(res, { success: true }, 200);
      })
      .catch(() =>
        setStatus(res, { success: false, error: 'server error' }, 500));
  }
}
