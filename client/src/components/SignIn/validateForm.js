import { isEqual } from 'lodash';

let error = [];

export const validateEmail = (email, inputName, handlerId) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) {
    document
      .querySelector(`input[name=${inputName}]`)
      .classList.add('error-border');
    document.querySelector(`#${handlerId}`).innerHTML =
      'Please enter a valid email address';
    email = null;
  } else {
    document
      .querySelector(`input[name=${inputName}]`)
      .classList.remove('error-border');
    document.querySelector(`#${handlerId}`).innerHTML = '';
  }
};

export const confirmPassword = (password, confirmPass) => {
  if (!isEqual(password, confirmPass)) {
    error.push(4);
    document.querySelector('#confirmPassword').classList.add('error-border');
    document
      .querySelector('#confirmPassword_error')
      .classList.add('text-danger');
    document.querySelector('#confirmPassword_error').innerHTML =
      'Your password did not match';
  } else {
    error = error.filter(item => item !== 4);
    document.querySelector('#confirmPassword_error').innerHTML =
      'Password match';
    document
      .querySelector('#confirmPassword_error')
      .classList.remove('text-danger');
    document.querySelector('#confirmPassword').classList.remove('error-border');
    document
      .querySelector('#confirmPassword_error')
      .classList.add('text-success');
  }
};
export const validatePassword = password => {
  const re = [/.*[a-zA-Z]+.*/, /.*[0-9].*/, /[!@#$%^&*(){}[\]<>?/|.:;_'"-]/];
  if (password === '') {
    document.querySelector('#password_error').innerHTML =
      'This field is required';
    document.querySelector('#newPassword').classList.add('error-border');
  } else {
    document.querySelector('#password_error').innerHTML = '';
    document.querySelector('#newPassword').classList.remove('error-border');
  }
  if (!re[0].test(password)) {
    document.querySelector('.alpha').classList.add('text-danger');
    document.querySelector('#newPassword').classList.add('error-border');
  } else {
    document.querySelector('.alpha').classList.remove('text-danger');
    document.querySelector('.alpha').classList.add('text-success');
  }
  if (!re[1].test(password)) {
    document.querySelector('#check_numbers').classList.add('text-danger');
    document.querySelector('#newPassword').classList.add('error-border');
  } else {
    document.querySelector('#check_numbers').classList.remove('text-danger');
    document.querySelector('#check_numbers').classList.add('text-success');
  }
  if (!re[2].test(password)) {
    document.querySelector('.characters').classList.add('text-danger');
    document.querySelector('#newPassword').classList.add('error-border');
  } else {
    document.querySelector('.characters').classList.remove('text-danger');
    document.querySelector('.characters').classList.add('text-success');
  }
  if (password.length < 8) {
    document.querySelector('.minLength').classList.add('text-danger');
    document.querySelector('#newPassword').classList.add('error-border');
  } else {
    document.querySelector('.minLength').classList.remove('text-danger');
    document.querySelector('.minLength').classList.add('text-success');
  }
  if (password.length > 20) {
    document.querySelector('.maxLength').classList.add('text-danger');
    document.querySelector('#newPassword').classList.add('error-border');
  } else {
    document.querySelector('.maxLength').classList.remove('text-danger');
    document.querySelector('.maxLength').classList.add('text-success');
  }
};
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
