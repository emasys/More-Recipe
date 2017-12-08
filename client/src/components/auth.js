import jwt_decode from 'jwt-decode';

const login = window.localStorage.getItem('token');
let decoded = '';

class Auth {
  static logout() {
    localStorage.removeItem('token');
  }

  static loggedIn() {
    if (login) {
      decoded = jwt_decode(login);
      return true;
    } else {
      return false;
    }
  }

  static userID() {
    return decoded.id;
  }

  static moniker() {
    return decoded.moniker;
  }
}

export default Auth;
