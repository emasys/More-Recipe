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
    const validator = new Validator(request, Users.signUpRules());
    if (validator.passes()) {
      if (request.confirmPassword !== request.password) {
        return res.status(401).send({ success: false, status: 'Your password didn\'t match' });
      }
      Users.findOne({
        where: { email: request.email }
      })
        .then((user) => {
          if (user) {
            return res.status(406).send({ success: false, status: 'email already exist in our database' });
          }
          Users.create({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            bio: req.body.bio,

          })
            .then((newUser) => {
              return res.status(201).send({ success: true, newUser });
            })
            .catch(error => res.status(500).send({ success: false, error }));
        })
        .catch((error) => {
          return res.status(500).send({ success: false, error: error.status });
        });
    } else {
      return res.status(401).send({ success: false, status: validator.errors.all() });
    }
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
      return res.status(400).send({ status: validator.errors.all() });
    }
    Users.findOne({
      where: {
        email: request.email
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ success: false, error: 'user not found' });
        }
        if (!user.comparePassword(user, request.password)) {
          return res.status(400).send({ status: 'Invalid email/password' });
        }
        const data = _.pick(user, ['id', 'firstName']);
        const token = jwt.sign(data, process.env.JWT_SECRET);
        return res.status(201).send({ success: true, token, });
      })
      .catch(error => res.send({ success: 'false', message: error }));
  }
}
