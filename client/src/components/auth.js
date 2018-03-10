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
}

export default Auth;
