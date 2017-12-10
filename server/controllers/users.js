import _ from 'lodash';
import Validator from 'validatorjs';
import dotenv from 'dotenv';
import { Users } from '../models';
import { setStatus, signToken, validateSignInForm, validateSignUpForm } from '../middleware/helper';

dotenv.config();

/**
 *
 * make class available
 * @export
 * @class
 */
export default class {
  /**
     *
     *
     * @param {object} req
     * @param {object} res
     * @returns
     *
     * Create a new user and add into the database
     */
  static signUp(req, res) {
    const request = req.body;

    const validator = new Validator(request, validateSignUpForm());
    if (validator.passes()) {
      if (request.confirmPassword !== request.password) {
        return setStatus(res, { success: false, status: "Your password didn't match" }, 401);
      }
      Users.findOne({
        where: { email: request.email },
      })
        .then((user) => {
          if (user) {
            return setStatus(
              res, {
                success: false,
                target: 'email',
                status: 'email already exist in our database',
              },
              406,
            );
          }

          Users.findOne({
            where: { moniker: request.moniker },
          })
            .then((username) => {
              if (username) {
                return setStatus(
                  res, {
                    success: false,
                    target: 'moniker',
                    status: 'moniker already exist in our database',
                  },
                  406,
                );
              }
              Users.create(request)
                .then((newUser) => {
                  const data = _.pick(newUser, [
                    'id',
                    'firstName',
                    'lastName',
                    'email',
                    'avatar',
                    'moniker',
                  ]);
                  const token = signToken(data);
                  return setStatus(res, { success: true, user: data, token }, 201);
                })
                .catch(() => setStatus(res, { success: false, error: 'record not saved' }, 500));
            })
            .catch(() => setStatus(res, { success: false, error: 'record not saved' }, 500));
        })
        .catch(() => setStatus(res, { success: false, error: 'record not saved' }, 500));
    } else {
      return setStatus(res, { success: false, status: validator.errors.all() }, 401);
    }
  }
  /**
         *
         *
         * @static
         * @param {any} req
         * @param {any} res
         * @returns
         */
  static getUsers(req, res) {
    return Users.findAll({})
      .then(users => setStatus(res, { success: true, users }, 200))
      .catch(error => setStatus(res, { success: false, error }, 200));
  }
  /**
         *
         *
         * @static
         * @param {any} req
         * @param {any} res
         * @returns a user profile
         */
  static getOneUser(req, res) {
    return Users.findById(req.params.userId)
      .then((user) => {
        const data = _.pick(user, [
          'id',
          'firstName',
          'lastName',
          'bio',
          'email',
          'country',
          'avatar',
          'moniker',
        ]);
        return setStatus(res, { success: true, data }, 200);
      })
      .catch(error => setStatus(res, { success: true, error }, 200));
  }
  /**
         *
         *
         * @static
         * @param {any} req
         * @param {any} res
         * @returns
         */
  static updateUser(req, res) {
    return Users.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          setStatus(res, {
            success: false,
            status: 'user Not Found',
          }, 404);
        }
        return user
          .update({
            firstName: req.body.firstName || user.firstName,
            lastName: req.body.lastName || user.lastName,
            bio: req.body.bio || user.bio,
          })
          .then(() => setStatus(res, { success: true, status: 'updated' }, 200))
          .catch(error => setStatus(res, { success: false, error }, 400));
      })
      .catch(error => setStatus(res, { success: false, error }, 400));
  }
  /**
         *
         *
         * @static
         * @param {any} req
         * @param {any} res
         * @returns
         */
  static deleteUser(req, res) {
    return Users.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return setStatus(res, { success: false, status: 'user not found' }, 404);
        }
        return user
          .destroy()
          .then(() => setStatus(res, { success: true, status: 'user deleted' }, 200))
          .catch(error => setStatus(res, { success: false, error }, 400));
      })
      .catch(error => setStatus(res, { success: false, error }, 400));
  }
  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @returns
 */
  static signIn(req, res) {
    const request = req.body;
    const validator = new Validator(request, validateSignInForm());
    if (validator.fails()) {
      return setStatus(res, { success: false, status: validator.errors.all() }, 400);
    }
    Users.findOne({
      where: {
        email: request.email,
      },
    })
      .then((user) => {
        if (!user) {
          return setStatus(res, { success: false, status: 'user not found' }, 404);
        }
        if (!user.comparePassword(user, request.password)) {
          return setStatus(res, { success: false, status: 'Invalid email/password' }, 400);
        }
        const payload = _.pick(user, [
          'id',
          'firstName',
          'lastName',
          'bio',
          'email',
          'country',
          'avatar',
          'moniker',
        ]);
        const token = signToken(payload);
        return setStatus(res, { success: true, token }, 200);
      })
      .catch(error => setStatus(res, { success: false, status: error }, 401));
  }
}
