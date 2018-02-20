export const validate = data => {
  const re = /[\s\d]/;
  let firstName = true,
    lastName = true;
  if (re.test(data.firstName) || data.firstName === '') {
    document.querySelector('#firstname_error').innerHTML =
      'Please enter a valid name';
    firstName = false;
  } else {
    document.querySelector('#firstname_error').innerHTML = '';
    firstName = true;
  }

  if (re.test(data.lastName) || data.lastName === '') {
    document.querySelector('#lastname_error').innerHTML =
      'Please enter a valid name';
    lastName = false;
  } else {
    document.querySelector('#lastname_error').innerHTML = '';
    lastName = true;
  }
  if (firstName && lastName) {
    return true;
  } else {
    return false;
  }
};

export const uploader = () => {
  //
};
