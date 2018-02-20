import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Users } from '../models';
import { setStatus } from './helper';


dotenv.config();

/**
 *
 *
 * @export
 * @class Authorization
 */
export default class Authorization {
  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} auth status
   * @memberof Authorization
   */
  static checkAdmin(req, res, next) {
    const token =
      req.body.token || req.query.token || req.headers['x-access-token'];
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) return setStatus(res, { message: 'Invalid authorization status' }, 401);
      Users.findAll({})
        .then(() => {
          if (decoded.moniker !== 'admin') return setStatus(res, { success: false, status: 'Not Authorized' }, 401);
          return next();
        })
        .catch(() => setStatus(res, { error: 'something went wrong' }, 501));
    });
  }

  /**
   *
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @memberof protectRoute
   * @returns {object} Auth status
   */
  static verifyToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) return setStatus(res, { message: 'Invalid authorization status' }, 401);
        return Users.findById(decoded.id)
          .then((user) => {
            if (!user) return setStatus(res, { error: 'user not found' }, 404);
            // assign decoded data to req.decoded
            req.decoded = decoded;
            return next();
          })
          .catch(() => setStatus(res, { error: 'something went wrong' }, 404));
      });
    } else {
      return setStatus(res, { error: 'Token not provided' }, 403);
    }
  }
}
