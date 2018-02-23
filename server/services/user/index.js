import { pick } from 'lodash';
import { Users, TokenGen } from '../../models';
import { setStatus, signToken, mailer } from '../../middleware/helper';

export const createUser = (res, request) =>
  Users.create(request)
    .then((newUser) => {
      const data = pick(newUser, ['id', 'moniker', 'avatar']);
      const token = signToken(data);
      return setStatus(res, { success: true, user: data, token }, 201);
    })
    .catch((error) => {
      if (error.errors) {
        return setStatus(res, { success: false, error: error.errors }, 409);
      }
      return setStatus(res, { success: false, error }, 500);
    });

export const AuthenticateUser = (res, request) => {
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
      const payload = pick(user, ['id', 'moniker', 'avatar']);
      const token = signToken(payload);
      return setStatus(res, { success: true, token }, 200);
    })
    .catch(() =>
      setStatus(res, { success: false, status: 'Server error' }, 500));
};

export const updateUserInfo = (res, req, request) =>
  Users.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return setStatus(res, { success: false, error: 'User not found' }, 404);
      }
      if (Number(req.params.userId) === Number(req.decoded.id)) {
        return user
          .update({
            firstName: request.firstName || user.firstName,
            lastName: request.lastName || user.lastName,
            bio: request.bio || user.bio,
            avatar: request.avatar || user.avatar,
            country: request.country || user.country
          })
          .then(() =>
            setStatus(res, { success: true, status: 'updated' }, 200));
      }
      return setStatus(res, { success: false, error: 'unauthorized' }, 401);
    })
    .catch(error =>
      setStatus(res, { success: false, error: error.message }, 500));

export const fetchUser = (res, req) => {
  Users.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return setStatus(
          res,
          { success: false, message: 'User not found' },
          404
        );
      }
      const data = pick(user, [
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
};

export const resetUserPassword = (res, request) => {
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
        .then(() => setStatus(res, { success: true, status: 'updated' }, 200));
    })
    .catch(() =>
      setStatus(res, { success: false, error: 'server error' }, 500));
};

export const sendGeneratedToken = (res, request) => {
  let token = null;
  return TokenGen.findOne({ where: { email: request.email } })
    .then((user) => {
      // eslint-disable-next-line no-mixed-operators
      token = Math.floor(1000 + Math.random() * 9000);
      request.token = token;
      if (!user) {
        return TokenGen.create(request).then((newuser) => {
          mailer('Reset password Token:', newuser.email, token);
          return setStatus(res, { success: true, status: 'token sent' }, 200);
        });
      }
      user
        .update({
          token: token || user.token
        })
        .then(() => {
          mailer('Reset password Token:', user.email, token);
          return setStatus(res, { success: true, status: 'token sent' }, 200);
        });
    })
    .catch(() =>
      setStatus(res, { success: true, status: 'user not found' }, 404));
};

export const getGeneratedToken = (res, request) => {
  TokenGen.findOne({ where: { email: request.email, token: request.token } })
    .then((user) => {
      if (!user) return setStatus(res, { success: false }, 404);
      return setStatus(res, { success: true }, 200);
    })
    .catch(() =>
      setStatus(res, { success: false, error: 'server error' }, 500));
};
