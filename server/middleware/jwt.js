import jwt from 'jsonwebtoken';
import { Users } from '../models';
import config from '../config/config';

const jwtSecret = config.jwtSecretKey;
/**
 *
 *
 * @export
 * @class protectRoute
 */
export default class protectRoute {
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @memberof protectRoute
   */
  static verifyToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, jwtSecret, (error, decoded) => {
        if (error) {
          return res.status(401).send({ message: 'Invalid authorization token' });
        }
        Users.findById(decoded.id)
          .then((user) => {
            if (!user) {
              return res.status(404).send({ error: 'user not found' });
            }
            req.decoded = decoded;
            return next();
          })
          .catch(err => res.status(404).send(err));
      });
    } else {
      res.status(403).json({
        message: 'Token not provided'
      });
    }
  }
}
