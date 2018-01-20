import React from 'react';
import PropTypes from 'prop-types';

const ResetPasswordForm = props => {
  const { email } = props.state;
  return (
    <form className="" onSubmit={props.resetPassword}>
      <ul className="form row">
        <li className="col-lg-12 col-sm-12">
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={props.emailChanged}
            className="col-lg-12 col-sm-12"
            name="recoveryEmail"
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
            name="newPassword"
            placeholder="min of 8 characters"
          />
          <div className="text-danger" id="newPassword_error" />
        </li>
        <li className="col-lg-12 col-sm-12">
          <label>Confirm New Password</label>
          <input
            type="password"
            required
            className="col-lg-12 col-sm-12"
            name="confirmPassword"
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
