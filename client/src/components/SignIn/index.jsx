import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pace from 'react-pace-progress';

// actions
import * as actions from '../../actions';

//components
import Navbar from '../Navbar';
import SignInForm from './SignInForm';
import ResetPasswordForm from './ResetPassword';
import ValidateForm from './validateForm';
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
    console.log(nextProps.signin.signIn);
    if (nextProps.signin.signIn) {
      if (nextProps.signin.signIn.success) {
        this.setState({
          showErrMessage: 'fade'
        });
        let linkPath = '/';
        if (nextProps.match.params) {
          linkPath = nextProps.location.pathname;
          if (linkPath === '/signin') linkPath = '/';
        }
        window.location.href = linkPath;
      }
      if (nextProps.signin.signIn.data.success === false) {
        this.setState({
          showErrMessage: 'show'
        });
      }
    }
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
    const data = {
      email: event.target.elements.recoveryEmail.value.trim(),
      password: event.target.elements.newPassword.value,
      confirmPassword: event.target.elements.confirmPassword.value,
      token: event.target.elements.token.value.trim()
    };

    if (ValidateForm(data)) {
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
    this.props.signIn(this.state);
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
        <div className="fixed-top">
          {this.props.netReq === true ? (
            <Pace color="#e7b52c" height={2} />
          ) : null}
        </div>
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
        <div
          className="row p-0 catalog-wrapper justify-content-center"
          data-aos="zoom-out"
        >
          <div className="AuthInfo col-lg-7 col-sm-12 justify-content-center text-center ">
            <img
              src="https://res.cloudinary.com/emasys/image/upload/v1516439649/mR_2_jwnuce.png"
              alt="logo"
              width="200"
              height="200"
              className="mt-30"
              data-aos="flip-right"
              data-aos-delay="1000"
              data-dos-duration="1000"
            />
            <h1
              className="text-white"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              Welcome back!
            </h1>
            <h4
              className="mt-10 text-white mb-10 pr-50 pl-50"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-dos-delay="1000"
            >
              We trust it's been an amazing experience for you so far... Let's
              continue to add spices to life.
            </h4>
          </div>
          <div className="col-lg-5 col-sm-8 pb-20 signin-form">
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
  reset: state.user.reset,
  netReq: state.netReq
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