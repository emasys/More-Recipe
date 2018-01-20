import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SignInForm = props => {
  const {
    email,
    showErrMessage,
  } = props.state;

  return (
    <form id="signin" className="form-ite" onSubmit={props.handleSubmit}>
      <ul className="form row">
        <li className="col-lg-12 col-sm-12">
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={props.emailChanged}
            className="col-lg-12 col-sm-12"
            name="email"
            id="inputEmail"
            placeholder="example@example.com"
          />
        </li>
        <li className="col-lg-12 col-sm-12">
          <label>Password</label>
          <input
            type="password"
            required
            onChange={props.pwChanged}
            className="col-lg-12 col-sm-12"
            name="pass"
            id="inputPassword"
            placeholder="**********"
          />
          <div className={`text-danger ${showErrMessage}`} id="moniker_error">
            Invalid email or password
          </div>
        </li>
        <li className="col-lg-12 col-sm-12 text-center">
          <button type="submit" className="btn btn-dark btn-lg col-5">
            Sign in
          </button>&nbsp;
          <Link to="/signup" className="btn btn-dark btn-lg col-5">
            Sign up
          </Link>
        </li>
        <li className="col-lg-12 col-sm-12 text-center">
          <span className="text-info hovered" onClick={props.resetForm}>
            forgot password?
          </span>
        </li>
      </ul>
    </form>
  );
};

export default SignInForm;
