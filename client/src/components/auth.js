import jwt_decode from 'jwt-decode';

const login = localStorage.getItem('token');
let decoded = '';
/**
 *
 *
 * @class Auth
 */
class Auth {
  /**
   *
   *
   * @static
   * @memberof Auth
   */
  static logout() {
    localStorage.removeItem('token');
  }
  /**
 *
 *
 * @static
 * @returns
 * @memberof Auth
 */
  static loggedIn() {
    if (login) {
      decoded = jwt_decode(login);
      return true;
    }
    return false;
  }
  /**
 *
 *
 * @static
 * @returns
 * @memberof Auth
 */
  static userID() {
    return decoded.id;
  }
  /**
 *
 *
 * @static
 * @returns
 * @memberof Auth
 */
  static moniker() {
    return decoded.moniker;
  }
}

export default Auth;
