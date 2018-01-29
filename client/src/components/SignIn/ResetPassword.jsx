import React from 'react';
import PropTypes from 'prop-types';

const onFocus = () => {
  document.querySelector('.rubics').classList.add('d-block');
};

const ResetPasswordForm = props => {
  const { recoveryEmail, newPassword } = props.state;
  return (
    <form className="" onSubmit={props.resetPassword}>
      <ul className="form row">
        <li className="col-lg-12 col-sm-12">
          <label>Email</label>
          <input
            type="email"
            required
            value={recoveryEmail}
            onChange={props.onChange}
            className="col-lg-12 col-sm-12"
            name="recoveryEmail"
            id="recoveryEmail"
            placeholder="example@example.com"
          />
          <div className="text-danger" id="recoverEmail_error" />
        </li>
        <li className="col-lg-12 col-sm-12">
          <label>New Password</label>
          <input
            type="password"
            required
            className="col-lg-12 col-sm-12"
            onChange={props.onChange}
            onFocus={onFocus}
            value={newPassword}
            name="newPassword"
            id="newPassword"
            placeholder="min of 8 characters"
          />
          {/* <div className="text-danger" id="newPassword_error" /> */}
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
            <p className="maxLength">
              Should not be greater than 20 characters
            </p>
          </div>
        </li>
        <li className="col-lg-12 col-sm-12">
          <label>Confirm New Password</label>
          <input
            type="password"
            required
            onChange={props.onChange}
            className="col-lg-12 col-sm-12"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="min of 8 characters"
          />
          <div className="text-danger" id="confirmPassword_error" />
        </li>
        <li className="col-lg-12 col-sm-12">
          <label>Token</label>
          <input
            type="text"
            required
            className="col-lg-12 col-sm-12"
            name="token"
            placeholder="enter 4-digit token"
          />
          <div className="text-danger" id="token_error" />
          <button
            className="btn btn-info mt-5 btn-block btn-lg "
            onClick={props.generateToken}
          >
            send token to my mail
          </button>
        </li>
        <li className="col-lg-12 col-sm-12">
          <button type="submit" className="btn btn-dark btn-block btn-lg ">
            Save New Password
          </button>
        </li>
        <li className="col-12 text-center">
          <span className="text-info hovered" onClick={props.resetForm}>
            Go back to sign in
          </span>
        </li>
      </ul>
    </form>
  );
};

export default ResetPasswordForm;
