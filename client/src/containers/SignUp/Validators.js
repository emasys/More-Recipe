import { isEqual } from 'lodash';

let error = [];
export const validateEmail = (email, inputName, handlerId) => {
  // eslint-disable-next-line
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

export const validateName = (name, inputName, handlerId) => {
  const re = /^[A-Za-z]+$/;
  if (!re.test(name)) {
    document.querySelector(`#${handlerId}`).innerHTML =
      'must not <b>contain spaces</b>, <b>symbols</b> or <b>numbers</b>';
    document
      .querySelector(`input[name=${inputName}]`)
      .classList.add('error-border');
    error.push(2);
  } else {
    error = error.filter(item => item !== 2);
    document.querySelector(`#${handlerId}`).innerHTML = '';
    document
      .querySelector(`input[name=${inputName}]`)
      .classList.remove('error-border');
  }
};

export const confirmPassword = (
  password,
  confirmPass,
  inputName,
  handlerId
) => {
  if (!isEqual(password, confirmPass)) {
    error.push(4);
    document
      .querySelector(`input[name=${inputName}]`)
      .classList.add('error-border');
    document.querySelector(`#${handlerId}`).classList.add('text-danger');
    document.querySelector(`#${handlerId}`).innerHTML =
      'Your password did not match';
  } else {
    error = error.filter(item => item !== 4);
    document.querySelector(`#${handlerId}`).innerHTML = 'Password match';
    document.querySelector(`#${handlerId}`).classList.remove('text-danger');
    document.querySelector(`#${inputName}`).classList.remove('error-border');
    document.querySelector(`#${handlerId}`).classList.add('text-success');
  }
};
export const validatePassword = (password, inputName, handlerId) => {
  const re = [/.*[a-zA-Z]+.*/, /.*[0-9].*/, /[!@#$%^&*(){}[\]<>?/|.:;_'"-]/];
  if (password === '') {
    document.querySelector(`#${handlerId}`).innerHTML =
      'This field is required';
    document.querySelector(`#${inputName}`).classList.add('error-border');
  } else {
    document.querySelector(`#${handlerId}`).innerHTML = '';
    document.querySelector(`#${inputName}`).classList.remove('error-border');
  }
  if (!re[0].test(password)) {
    document.querySelector('.alpha').classList.add('text-danger');
    document.querySelector(`#${inputName}`).classList.add('error-border');
  } else {
    document.querySelector('.alpha').classList.remove('text-danger');
    document.querySelector('.alpha').classList.add('text-success');
  }
  if (!re[1].test(password)) {
    document.querySelector('#check_numbers').classList.add('text-danger');
    document.querySelector(`#${inputName}`).classList.add('error-border');
  } else {
    document.querySelector('#check_numbers').classList.remove('text-danger');
    document.querySelector('#check_numbers').classList.add('text-success');
  }
  if (!re[2].test(password)) {
    document.querySelector('.characters').classList.add('text-danger');
    document.querySelector(`#${inputName}`).classList.add('error-border');
  } else {
    document.querySelector('.characters').classList.remove('text-danger');
    document.querySelector('.characters').classList.add('text-success');
  }
  if (password.length < 8) {
    document.querySelector('.minLength').classList.add('text-danger');
    document.querySelector(`#${inputName}`).classList.add('error-border');
  } else {
    document.querySelector('.minLength').classList.remove('text-danger');
    document.querySelector('.minLength').classList.add('text-success');
  }
  if (password.length > 20) {
    document.querySelector('.maxLength').classList.add('text-danger');
    document.querySelector(`#${inputName}`).classList.add('error-border');
  } else {
    document.querySelector('.maxLength').classList.remove('text-danger');
    document.querySelector('.maxLength').classList.add('text-success');
  }
};

export const validateMoniker = moniker => {
  const re = /^[a-z0-9]+$/i;
  if (!re.test(moniker)) {
    error.push(5);
    document
      .querySelector("input[name='moniker']")
      .classList.add('error-border');
    document.querySelector('#moniker_error').innerHTML =
      'Alphanumeric characters only';
  } else {
    error = error.filter(item => item !== 5);
    document
      .querySelector("input[name='moniker']")
      .classList.remove('error-border');
    document.querySelector('#moniker_error').innerHTML = '';
  }
};

const errorMessages = () => {
  if (error.length === 0) return true;
  return false;
};
export default errorMessages;
