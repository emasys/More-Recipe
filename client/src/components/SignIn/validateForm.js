import { isEqual } from 'lodash';

const validateForm = data => {
  if (data.email === '') {
    document.querySelector('#recoverEmail_error').innerHTML =
      'Please enter a valid email address';
    data.email = null;
  } else {
    document.querySelector('#recoverEmail_error').innerHTML = '';
  }

  if (data.password.length < 8) {
    document.querySelector('#newPassword_error').innerHTML =
      'Please enter a valid password not less than 8 characters';
    data.password = null;
  } else {
    document.querySelector('#newPassword_error').innerHTML = '';
  }

  if (data.token === '') {
    document.querySelector('#token_error').innerHTML =
      'Check your email for your token';
    data.token = null;
  } else {
    document.querySelector('#token_error').innerHTML = '';
  }

  if (!isEqual(data.password, data.confirmPassword)) {
    document.querySelector('#confirmPassword_error').innerHTML =
      'Your password did not match';
    data.confirmPassword = null;
  } else {
    document.querySelector('#confirmPassword_error').innerHTML = '';
  }

  if (data.email && data.confirmPassword && data.password && data.token) {
    return true;
  } else {
    return false;
  }
};

export default validateForm;
