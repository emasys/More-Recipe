import lodash from 'lodash';

let error = [];
export const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return re.test(email);
  if (!re.test(email)) {
    document.querySelector("input[name='email']").classList.add('error-border');
    document.querySelector('#email_error').innerHTML =
      'Please enter a valid email address';
    error.push(1);
  } else {
    error = error.filter(item => item !== 1);
    document
      .querySelector("input[name='email']")
      .classList.remove('error-border');
    document.querySelector('#email_error').innerHTML = '';
  }
};

export const validateFirstName = name => {
  const re = /^[A-Za-z]+$/;
  if (!re.test(name)) {
    document.querySelector('#fname_error').innerHTML =
      'must not <b>be empty</b>, <b>contain spaces</b>, <b>symbols</b> or <b>numbers</b>';
    document.querySelector("input[name='fname']").classList.add('error-border');
    error.push(2);
  } else {
    error = error.filter(item => item !== 2);
    document.querySelector('#fname_error').innerHTML = '';
    document
      .querySelector("input[name='fname']")
      .classList.remove('error-border');
  }
};

export const validateLastName = name => {
  const re = /^[A-Za-z]+$/;
  if (!re.test(name)) {
    error.push(3);
    document.querySelector('#lname_error').innerHTML =
      'must not <b>be empty</b>, <b>contain spaces</b>, <b>symbols</b> or <b>numbers</b>';
    document.querySelector("input[name='lname']").classList.add('error-border');
  } else {
    error = error.filter(item => item !== 3);
    document.querySelector('#lname_error').innerHTML = '';
    document
      .querySelector("input[name='lname']")
      .classList.remove('error-border');
  }
};

export const confirmPassword = (password, confirmPass) => {
  if (!lodash.isEqual(password, confirmPass)) {
    error.push(4);
    document.querySelector("#confirmPassword").classList.add('error-border');    
    document.querySelector('#cp_error').classList.add('text-danger');
    document.querySelector('#cp_error').innerHTML =
      'Your password did not match';
  } else {
    error = error.filter(item => item !== 4);
    document.querySelector('#cp_error').innerHTML = 'Password match';
    document.querySelector('#cp_error').classList.remove('text-danger');
    document.querySelector("#confirmPassword").classList.remove('error-border');        
    document.querySelector('#cp_error').classList.add('text-success');
  }
};
export const validatePassword = password => {
  const re = [/.*[a-zA-Z]+.*/, /.*[0-9].*/, /[!@#$%^&*(){}[\]<>?/|.:;_'"-]/];
  if (password === '') {
    document.querySelector('#password_error').innerHTML =
      'This field is required';
    document.querySelector('#password').classList.add('error-border');
  } else {
    document.querySelector('#password_error').innerHTML = '';
    document.querySelector('#password').classList.remove('error-border');
  }
  if (!re[0].test(password)) {
    document.querySelector('.alpha').classList.add('text-danger');
    document.querySelector('#password').classList.add('error-border');
  } else {
    document.querySelector('.alpha').classList.remove('text-danger');
    document.querySelector('.alpha').classList.add('text-success');
  }
  if (!re[1].test(password)) {
    document.querySelector('#check_numbers').classList.add('text-danger');
    document.querySelector('#password').classList.add('error-border');
  } else {
    document.querySelector('#check_numbers').classList.remove('text-danger');
    document.querySelector('#check_numbers').classList.add('text-success');
  }
  if (!re[2].test(password)) {
    document.querySelector('.characters').classList.add('text-danger');
    document.querySelector('#password').classList.add('error-border');
  } else {
    document.querySelector('.characters').classList.remove('text-danger');
    document.querySelector('.characters').classList.add('text-success');
  }
  if (password.length < 8) {
    document.querySelector('.minLength').classList.add('text-danger');
    document.querySelector('#password').classList.add('error-border');
  } else {
    document.querySelector('.minLength').classList.remove('text-danger');
    document.querySelector('.minLength').classList.add('text-success');
  }
  if (password.length > 20) {
    document.querySelector('.maxLength').classList.add('text-danger');
    document.querySelector('#password').classList.add('error-border');
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

const errorMessages = error;
export default errorMessages;
