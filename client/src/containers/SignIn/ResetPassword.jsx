import React from 'react';
import PropTypes from 'prop-types';


const ResetPasswordForm = props => {
  const {
    onChange,
    onFocus,
    onBlur,
    generateToken,
    resetForm,
    state: {
      recoveryEmail, newPassword, display, buttonName,
      hideForm, showRubics, tokenError
    }
  } = props;
  return (
    <form name="form" className="" onSubmit={props.resetPassword}>
      <ul className="form row">
        <li className="col-lg-12 col-sm-12">
          <label>Email</label>
          <input
            type="email"
            required
            value={recoveryEmail}
            onChange={onChange}
            className="col-lg-12 col-sm-12"
            name="recoveryEmail"
            id="recoveryEmail"
            placeholder="example@example.com"
          />
          <div className={`text-danger ${display}`} id="recoverEmail_error" >
          This email address is not in our records
          </div>
          <button
            className="btn btn-info mt-5 btn-block btn-lg "
            onClick={generateToken}
            name="sendToken"
            id="sendToken"
          >
            {buttonName}
          </button>
        </li>
        <li className={`col-lg-12 col-sm-12 ${hideForm} d-none`}>
          <label>New Password</label>
          <input
            type="password"
            required

            className="col-lg-12 col-sm-12"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            value={newPassword}
            name="newPassword"
            id="newPassword"
            placeholder="min of 8 characters"
          />
          <div className={`rubics ${showRubics}`}>
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
        <li className={`col-lg-12 col-sm-12 ${hideForm} d-none`}>
          <label>Confirm New Password</label>
          <input
            type="password"
            required
            onChange={onChange}
            className="col-lg-12 col-sm-12"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="min of 8 characters"
          />
          <div className="text-danger" id="confirmPassword_error" />
        </li>
        <li className={`col-lg-12 col-sm-12 ${hideForm} d-none`}>
          <label>Token</label>
          <input
            type="text"
            required
            onFocus={onBlur}
            className="col-lg-12 col-sm-12 "
            name="token"
            placeholder="enter 4-digit token"
          />
          <div className={`text-danger ${tokenError}`} id="token_error" > Invalid Token</div>
        </li>
        <li className={`col-lg-12 col-sm-12 ${hideForm} d-none`}>
          <button type="submit" className="btn btn-dark btn-block btn-lg" >
            Save New Password
          </button>
        </li>
        <li className="col-12 text-center">
          <span className="text-info hovered" onClick={resetForm}>
            Go back to sign in
          </span>
        </li>
      </ul>
    </form>
  );
};

ResetPasswordForm.propTypes = {
  resetForm: PropTypes.func.isRequired,
  generateToken: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};
export default ResetPasswordForm;
