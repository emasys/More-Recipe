import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { toast, ToastContainer } from 'react-toastify';

// actions
import {
  resetPassword,
  signIn,
  compareToken,
  sendToken
} from '../../actions/authActions';

//components
import Navbar from '../../components/Navbar';
import Preloader from '../../components/Preloader';
import SignInForm from './SignInForm';
import ResetPasswordForm from './ResetPassword';
import errorMessages, {
  validateEmail,
  validatePassword,
  confirmPassword
} from '../SignUp/Validators';

/**
 *
 *@param {object} event
 * @class SignIn
 * @extends {Component}
 */
class SignIn extends Component {
  static propTypes = {
    msg: PropTypes.string,
    reset: PropTypes.object,
    resetPassword: PropTypes.func.isRequired,
    signin: PropTypes.object.isRequired,
    signIn: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    compareToken: PropTypes.func.isRequired,
    sendToken: PropTypes.func.isRequired
  };

  static defaultProps = {
    msg: null,
    reset: null
  };
  /**
   * Creates an instance of SignIn.
   * @param {any} props
   * @memberof SignIn
   */
  constructor(props) {
    super(props);
    this.state = {
      recoveryEmail: '',
      email: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
      showErrMessage: 'fade',
      message: '',
      success: false,
      showProps: false,
      resetPass: false
    };
  }
  /**
   * @returns {any}
   * invoked immediately after a
   * component is mounted
   * @memberof SignIn
   */
  componentDidMount() {
    window.scrollTo(0, 0);
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
        // nextProps.history.push(linkPath);
        window.location.href = linkPath;
      } else if (!nextProps.signin.signIn.data.success) {
        this.setState({
          showErrMessage: 'show'
        });
      }
    }
    if (nextProps.reset) {
      if (nextProps.reset.success) {
        this.setState({
          resetPass: false,
          success: true
        });
      } else {
        document.querySelector('#recoverEmail_error').innerHTML =
          "User account not found, <a href='/signup'>sign up</a>";
      }
    }
  }

  tokenSent = () =>
    toast('Token Sent! check your email', {
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });

  clearError = () => {
    this.setState({
      showErrMessage: 'fade'
    });
  };
  /**
   *
   *
   * @param {any} event
   * @memberof SignIn
   * @returns {any} password input text
   */
  onChange = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        if (this.state.recoveryEmail) {
          validateEmail(
            this.state.recoveryEmail,
            'recoveryEmail',
            'recoveryEmail'
          );
        }
        if (this.state.newPassword) {
          validatePassword(
            this.state.newPassword,
            'newPassword',
            'password_error'
          );
        }
        if (this.state.confirmPassword) {
          confirmPassword(
            this.state.newPassword,
            this.state.confirmPassword,
            'confirmPassword',
            'confirmPassword_error'
          );
        }
      }
    );
  };
  /**
   *
   *
   * @memberof SignIn
   * @returns {any} password input text
   */
  resetForm = () => {
    if (!this.state.resetPass) {
      this.setState({
        resetPass: true,
        success: false
      });
    } else {
      this.setState({
        resetPass: false,
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
    if (errorMessages()) {
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
    this.props.sendToken({ email: this.state.recoveryEmail });
    this.tokenSent();
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
    const data = {
      email: event.target.elements.email.value.trim(),
      password: event.target.elements.pass.value
    };
    this.props.signIn(data);
  };
  /**
   *
   *
   * @returns {any} jsx
   * @memberof SignIn
   */
  render() {
    const {
      message, showProps, resetPass, success
    } = this.state;
    return (
      <section className="container mt-100 mb-100 ">
        <Preloader />
        <ToastContainer />
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
          data-aos="fade-up"
          data-aos-duration="1000"
          className="row p-0 justify-content-center"
        >
          <div className="catalog-wrapper col-lg-6 col-md-9 p-0">
            <div className="AuthInfo col-12 text-center ">
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
              <h1 className="text-white">Welcome back!</h1>
              <h4 className="mt-10 text-white mb-10 pr-50 pl-50 pb-20">
                We trust it has been an amazing experience for you so far...
                Keep adding spices to life!
              </h4>
            </div>
            <div className="col-12 pb-20 signin-form">
              {!resetPass && (
                <SignInForm
                  handleSubmit={this.handleSubmit}
                  state={this.state}
                  clearError={this.clearError}
                  resetForm={this.resetForm}
                />
              )}
              {resetPass && (
                <ResetPasswordForm
                  state={this.state}
                  onChange={this.onChange}
                  emailChanged={this.emailChanged}
                  resetPassword={this.resetPassword}
                  generateToken={this.generateToken}
                  resetForm={this.resetForm}
                />
              )}
            </div>
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

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      resetPassword,
      signIn,
      compareToken,
      sendToken
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
