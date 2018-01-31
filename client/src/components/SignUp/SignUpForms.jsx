import React from 'react';
import Textarea from 'react-textarea-autosize';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Countries from '../CountryList';

const onFocus = () => {
  document.querySelector('.rubics').classList.add('d-block');
};

const SignUpForm = props => (
  <form onSubmit={props.handleSubmit}>
    <ul className="form row p-10">
      <li className="col-lg-6 p-3">
        <label>First Name</label>
        <input
          type="text"
          required
          placeholder="First Name"
          className="col-12"
          name="fname"
          id="fname"
          onChange={props.onChange}
        />
        <div className="text-danger" id="fname_error" />
      </li>
      <li className="col-lg-6 p-3">
        <label>Last Name</label>
        <input
          type="text"
          required
          placeholder="Last Name"
          className="col-12"
          name="lname"
          id="inputLName"
          onChange={props.onChange}
        />
        <div className="text-danger" id="lname_error" />
      </li>
      <li className="col-lg-6 p-3">
        <label>Email</label>
        <input
          type="email"
          required
          className="col-12"
          name="email"
          onChange={props.onChange}
          placeholder="example@example.com"
        />
        <div className="text-danger" id="email_error" />
      </li>
      <li className="col-lg-6 p-3">
        <label>Username</label>
        <input
          type="text"
          required
          className="col-12"
          name="moniker"
          id="moniker"
          onChange={props.onChange}
          placeholder="johnDoe23"
        />
        <div className="text-danger" id="moniker_error" />
      </li>

      <li className="col-lg-6 p-3">
        <label>Password</label>
        <input
          type="password"
          required
          className="col-12 mb-2"
          name="password"
          id="password"
          onFocus={onFocus}
          onChange={props.onChange}
          placeholder="**********"
        />
        <div className="rubics">
          <p className="text-danger" id="password_error" />
          <p className="alpha">Should contain at least one alphabet</p>
          <p className="numbers" id="check_numbers">
            Should contain at least one number
          </p>
          <p className="characters">
            Should contain at least one special character
          </p>
          <p className="minLength">Should not be less than 8 characters</p>
          <p className="maxLength">Should not be greater than 20 characters</p>
        </div>
      </li>
      <li className="col-lg-6 p-3">
        <label>Confirm Password</label>
        <input
          type="password"
          required
          className="col-12"
          name="confirmPassword"
          id="confirmPassword"
          onChange={props.onChange}
          placeholder="**********"
        />
        <div className="text-danger" id="cp_error" />
      </li>
      <li className="special col-lg-6 p-3">
        <label>Country</label>

        <select name="country" className="col-12 " style={{ height: '50px' }}>
          {Countries.map(country => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </li>
      <li className="special col-lg-6 p-3">
        <label>Bio</label>
        <Textarea
          className="col-12"
          id="FormControlTextarea"
          placeholder="optional"
          name="bio"
          minRows={3}
          maxRows={5}
        />
      </li>

      <li className=" col-12 ">
        <input
          type="submit"
          value="submit"
          id="submit"
          className="btn bg-dark btn hovered"
        />
      </li>
      <li className="col-lg-12 col-sm-12 text-center">
        <Link to="/signin" className="text-info hovered">
          Already have an account?
        </Link>
      </li>
    </ul>
  </form>
);

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func,
  onChange: PropTypes.func
};

export default SignUpForm;
