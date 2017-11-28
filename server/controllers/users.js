import jwt from 'jsonwebtoken';
import _ from 'lodash';
import Validator from 'validatorjs';
import dotenv from 'dotenv';
import { Users } from '../models';

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
    // console.log(req.file);
    if (req.file) {
      request.avatar = req.file.filename;
    }
    const validator = new Validator(request, Users.signUpRules());
    if (validator.passes()) {
      if (request.confirmPassword !== request.password) {
        return res
          .status(401)
          .send({ success: false, status: "Your password didn't match" });
      }
      Users.findOne({
        where: { email: request.email }
      })
        .then(user => {
          if (user) {
            return res.status(406).send({
              success: false,
              target: 'email',
              status: 'email already exist in our database'
            });
          }

          Users.findOne({
            where: { moniker: request.moniker }
          })
            .then(user => {
              if (user) {
                return res.status(406).send({
                  success: false,
                  target: 'moniker',
                  status: 'moniker already exist in our database'
                });
              }
              Users.create(request)
                .then(newUser => {
                  const data = _.pick(newUser, [
                    'id',
                    'firstName',
                    'lastName',
                    'email',
                    'avatar',
                    'moniker'
                  ]);
                  const token = jwt.sign(data, process.env.JWT_SECRET, {
                    expiresIn: '7d'
                  });
                  return res
                    .status(201)
                    .send({ success: true, user: data, token: token });
                })
                .catch(error =>
                  res.status(500).send({ success: false, error })
                );
            })
            .catch(error => {
              return res
                .status(500)
                .send({ success: false, error: error.status });
            });
        })
        .catch(error => {
          return res.status(500).send({ success: false, error: error.status });
        });
    } else {
      return res
        .status(401)
        .send({ success: false, status: validator.errors.all() });
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
      .then(users => res.status(200).send({ success: true, users }))
      .catch(error => res.status(400).send({ success: false, error }));
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
    return Users.findById(req.params.userId, {})
      .then(user => {
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
        res.status(200).send({ success: true, data });
      })
      .catch(error => res.status(400).send({ success: false, error }));
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
    return Users.findById(req.params.userId, {})
      .then(user => {
        if (!user) {
          return res.status(404).send({
            success: false,
            status: 'user Not Found'
          });
        }
        return user
          .update({
            firstName: req.body.firstName || user.firstName,
            lastName: req.body.lastName || user.lastName,
            bio: req.body.bio || user.bio
          })
          .then(() =>
            res.status(200).send({ success: true, status: 'updated' })
          )
          .catch(error => res.status(400).send({ success: false, error }));
      })
      .catch(error => res.status(400).send(error));
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
      .then(user => {
        if (!user) {
          res.status(404).json({ success: false, status: 'user not found' });
        }
        return user
          .destroy()
          .then(() =>
            res.status(200).send({ success: true, status: 'user deleted' })
          )
          .catch(error => res.status(400).send({ error }));
      })
      .catch(error => res.status(400).send({ error }));
  }
  /**
   * Log in user and validate user request
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static signIn(req, res) {
    const request = req.body;
    const validator = new Validator(request, Users.signInRules());
    if (validator.fails()) {
      return res
        .status(400)
        .send({ success: false, status: validator.errors.all() });
    }
    Users.findOne({
      where: {
        email: request.email
      }
    })
      .then(user => {
        if (!user) {
          return res
            .status(404)
            .send({ success: false, status: 'user not found' });
        }
        if (!user.comparePassword(user, request.password)) {
          return res
            .status(400)
            .send({ success: false, status: 'Invalid email/password' });
        }
        const payload = _.pick(user, [
          'id',
          'firstName',
          'lastName',
          'bio',
          'email',
          'country',
          'avatar',
          'moniker'
        ]);
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '7d'
        });
        return res.status(201).send({ success: true, token });
      })
      .catch(error => res.send({ success: 'false', message: error }));
  }
}
