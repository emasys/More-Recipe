import jwtDecode from 'jwt-decode';

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
   * @returns {null} null token
   */
  static logout() {
    localStorage.removeItem('token');
  }
  /**
   *
   *
   * @static
   * @returns {bool} boolean
   * @memberof Auth
   */
  static loggedIn() {
    if (login) {
      decoded = jwtDecode(login);
      return true;
    }
    return false;
  }
  /**
   *
   *
   * @static
   * @returns {int} user id
   * @memberof Auth
   */
  static userID() {
    return decoded.id;
  }
  /**
   *
   *
   * @static
   * @returns { string } moniker
   * @memberof Auth
   */
  static moniker() {
    return decoded.moniker;
  }
  /**
   *
   *
   * @static
   * @returns { string } avatar
   * @memberof Auth
   */
  static avatar() {
    return decoded.avatar;
  }
}

export default Auth;
