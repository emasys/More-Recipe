import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';

// actions
import * as actions from '../../actions';

//components
import Navbar from '../Navbar';
import SignInForm from './SignInForm';
import ResetPasswordForm from './ResetPassword';
/**
 *
 *
 * @class SignIn
 * @extends {Component}
 */
class SignIn extends Component {
  /**
   * Creates an instance of SignIn.
   * @param {any} props
   * @memberof SignIn
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showErrMessage: 'fade',
      message: '',
      success: false,
      showProps: false,
      resetPassword: false
    };
  }
  /**
   * @returns {any}
   * invoked immediately after a
   * component is mounted
   * @memberof SignIn
   */
  componentDidMount() {
    if (this.props.msg) {
      this.setState({
        message: this.props.msg,
        showProps: true
      });
    }
  }
  /**
   * @returns {any}
   * invoked before a mounted component
   * receives new props
   * @param {any} nextProps
   * @memberof SignIn
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.reset) {
      if (nextProps.reset.success) {
        this.setState({
          resetPassword: false,
          success: true
        });
      } else {
        document.querySelector('#recoverEmail_error').innerHTML =
          "User account not found, <a href='/signup'>sign up</a>";
      }
    }
  }

  /**
   *
   *
   * @param {any} event
   * @memberof SignIn
   * @returns {any} email input text
   */
  emailChanged = event => {
    this.setState({
      email: event.target.value
    });
  };
  /**
   *
   *
   * @param {any} event
   * @memberof SignIn
   * @returns {any} password input text
   */
  pwChanged = event => {
    this.setState({
      password: event.target.value
    });
  };
  /**
   *
   *
   * @memberof SignIn
   * @returns {any} password input text
   */
  resetForm = () => {
    if (!this.state.resetPassword) {
      this.setState({
        resetPassword: true,
        success: false
      });
    } else {
      this.setState({
        resetPassword: false,
        success: false
      });
    }
  };
  /**
   *
   *
   * @param {any} event
   * @memberof SignIn
   * @returns {any}
   * triggers reset password action
   */
  resetPassword = event => {
    event.preventDefault();
    console.log(event.target.elements.recoveryEmail.value);
    const data = {
      email: event.target.elements.recoveryEmail.value.trim(),
      password: event.target.elements.newPassword.value,
      confirmPassword: event.target.elements.confirmPassword.value,
      token: event.target.elements.token.value.trim()
    };
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
      this.props.compareToken(data).then(() => {
        if (this.props.signin.compareToken.success === true) {
          this.props.resetPassword(data);
        } else {
          document.querySelector('#token_error').innerHTML = 'invalid token';
        }
      });
    }
  };

  generateToken = event => {
    event.preventDefault();
    this.props.sendToken({ email: this.state.email });
  };
  /**
   *
   *
   * @param {any} event
   * @memberof SignIn
   * @returns {any} a new page
   */
  handleSubmit = event => {
    event.preventDefault();

    this.props.signIn(this.state).then(() => {
      if (this.props.signin.signIn.success) {
        this.setState({
          showErrMessage: 'fade'
        });
        let linkPath = '/';
        if (this.props.match.params) {
          linkPath = this.props.location.pathname;
          if (linkPath === '/signin') linkPath = '/';
        }
        window.location.href = linkPath;
      }
      if (this.props.signin.signIn.data.success === false) {
        this.setState({
          showErrMessage: 'show'
        });
      }
    });
  };
  /**
   *
   *
   * @returns {any} jsx
   * @memberof SignIn
   */
  render() {
    const {
      message, showProps, resetPassword, success
    } = this.state;
    return (
      <section className="container mt-100 mb-100 ">
        <Navbar className="bg-dark fixed-top" />
        {showProps && (
          <div className="alert alert-warning" role="alert">
            <strong>{message}</strong>
          </div>
        )}
        {success && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>New Password Saved!</strong> Login with new password
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <div className="row p-0 catalog-wrapper justify-content-center" data-aos="zoom-out">
          <div className="AuthInfo col-lg-6 col-sm-12 text-center ">
            <img
              src="https://res.cloudinary.com/emasys/image/upload/v1516439649/mR_2_jwnuce.png"
              alt="logo"
              width="200"
              height="200"
              className="mt-30"
            />
            <h1 className="text-white">Welcome back!</h1>
            <p className=" lead mt-10 text-white bg-mirror px-50 ">
              “Cooking is not a science but an art, mistakes are okay, messes
              are fine—the pleasure is in the creating and the sharing of the
              result.” ― Lori Pollan
            </p>
            <p className=" lead mt-1 text-white bg-mirror p-10 ">
              We trust it's been an amazing experience for you so far... Let's
              continue to add spices to life.
            </p>
          </div>
          <div className="col-lg-6 col-sm-8 pb-20 signin-form">
            {!resetPassword && (
              <SignInForm
                handleSubmit={this.handleSubmit}
                state={this.state}
                emailChanged={this.emailChanged}
                pwChanged={this.pwChanged}
                resetForm={this.resetForm}
              />
            )}
            {resetPassword && (
              <ResetPasswordForm
                state={this.state}
                emailChanged={this.emailChanged}
                resetPassword={this.resetPassword}
                generateToken={this.generateToken}
                resetForm={this.resetForm}
              />
            )}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  signin: state.user,
  reset: state.user.reset
});

SignIn.propTypes = {
  msg: PropTypes.string,
  reset: PropTypes.object,
  resetPassword: PropTypes.func,
  signin: PropTypes.object,
  signIn: PropTypes.func,
  match: PropTypes.object,
  location: PropTypes.object
};

export default connect(mapStateToProps, actions)(SignIn);
