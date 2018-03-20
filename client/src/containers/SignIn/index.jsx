import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import { validate } from 'email-validator';

// actions
import {
  resetPassword,
  signIn,
  compareToken,
  sendToken,
  clearAuthInfo
} from '../../actions/authActions';

//components
import Navbar from '../../components/Navbar';
import SignInForm from './SignInForm';
import ResetPasswordForm from './ResetPassword';
import errorMessages, {
  validateEmail,
  validatePassword,
  confirmPassword
} from '../validator/index';

/**
 *
 * @class SignIn
 * @extends {Component}
 */
export class SignIn extends Component {
  static propTypes = {
    msg: PropTypes.string,
    reset: PropTypes.object,
    signin: PropTypes.object.isRequired,
    signIn: PropTypes.func.isRequired,
    compareToken: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    sendToken: PropTypes.func.isRequired
  };

  static defaultProps = {
    msg: null,
    reset: null
  };
  /**
   * Creates an instance of SignIn.
   * @param {object} props
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
      display: 'd-none',
      buttonName: 'Send Token',
      hideForm: 'd-none',
      showRubics: 'd-none',
      tokenError: 'd-none',
      success: false,
      showProps: false,
      resetPass: false
    };
    this.handleTokenDispatch = this.handleTokenDispatch.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearError = this.clearError.bind(this);
    this.generateToken = this.generateToken.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }
  /**
   * @returns {void}
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
   * @returns {void}
   * invoked before a mounted component
   * receives new props
   * @param {object} nextProps
   *
   * @memberof SignIn
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isLoggedIn) {
      nextProps.history.push('/');
    }
    if (nextProps.signin.compareToken &&
      !nextProps.signin.compareToken.success) {
      this.setState({ tokenError: 'd-block' });
    }

    if (nextProps.tokenStatus) {
      this.handleTokenDispatch();
    }
    if (nextProps.signin.signIn) {
      if (nextProps.signin.signIn.success) {
        this.setState({
          showErrMessage: 'fade'
        });
        let linkPath = '/';
        if (nextProps.signin.path) {
          linkPath = nextProps.signin.path;
          if (linkPath === '/signin') linkPath = '/';
        }
        nextProps.history.push(linkPath);
      } else {
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
      }
    }
  }

  /**
   *
   *
   * @param {object} nextProps
   * @param {object} nextState
   *
   * @returns {bool} true
   *
   * @memberOf SignIn
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.signin.signIn) {
      if (nextProps.isLoading) return false;
      return true;
    }
    return true;
  }

  tokenSent = () =>
    toast('Token Sent! check your email', {
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });

  /**
   * Clear error on focus in login form
   *
   * @returns {void}
   *
   * @memberOf SignIn
   */
  clearError() {
    this.setState({
      showErrMessage: 'fade'
    });
  }

  /**
   * Change value of button
   *
   *
   * @returns {void}
   *
   * @memberOf SignIn
   */
  handleTokenDispatch() {
    if (!this.props.tokenStatus || this.props.tokenStatus.data) {
      this.setState({ display: 'd-block' });
    } else {
      this.setState({ display: 'd-none', buttonName: 'Re-send Token', hideForm: 'd-block' });
      this.tokenSent();
      this.props.clearAuthInfo();
    }
  }
  /**
   *
   *
   * @param {object} event
   *
   * @memberof SignIn
   *
   * @returns {object} state change
   */
  onChange(event) {
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
  }

  /**
   * Toggle password validation errors
   *
   * @returns {void}
   *
   * @memberOf SignIn
   */
  onFocus() {
    this.setState({ showRubics: 'd-block' });
  }

  /**
   * Toggle password validation errors
   *
   * @returns {void}
   *
   * @memberOf SignIn
   */
  onBlur() {
    this.setState({ showRubics: 'd-none' });
    this.setState({ tokenError: 'd-none' });
  }
  /**
   *
   *
   * @memberof SignIn
   * @returns {void}
   */
  resetForm = () => {
    this.props.clearAuthInfo();
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
   * @param {void} event
   *
   * @memberof SignIn
   *
   * @returns {void}
   * triggers reset password action
   */
  resetPassword(event) {
    event.preventDefault();
    const data = {
      email: event.target.elements.recoveryEmail.value.trim(),
      password: event.target.elements.newPassword.value,
      confirmPassword: event.target.elements.confirmPassword.value,
      token: event.target.elements.token.value.trim()
    };
    if (errorMessages()) {
      this.props.compareToken(data);
    }
  }

  /**
   * Generate Token
   *
   * @param {object} event
   *
   * @returns {void}
   *
   * @memberOf SignIn
   */
  generateToken(event) {
    event.preventDefault();
    if (validate(this.state.recoveryEmail)) {
      this.props.sendToken({ email: this.state.recoveryEmail });
    }
  }


  /**
   *
   *
   * @param {object} event
   *
   * @memberof SignIn
   *
   * @returns {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    const data = {
      email: event.target.elements.email.value.trim(),
      password: event.target.elements.pass.value
    };
    if (data.email && data.password) {
      this.props.signIn(data);
    }
  }
  /**
   *
   *
   * @returns {JSX.Element} React element
   *
   * @memberof SignIn
   */
  render() {
    const { resetPass, success } = this.state;
    return (
      <section className="container mt-100 mb-100 ">
        <ToastContainer />
        <Navbar className="bg-dark fixed-top" />
        {this.props.signin.message && (
          <div className="alert alert-warning" role="alert">
            <strong>{this.props.signin.message}</strong>
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
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
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

export const mapStateToProps = state => ({
  signin: state.user,
  reset: state.user.reset,
  isLoading: state.isLoading,
  tokenStatus: state.user.sendToken,
  auth: state.user
});


export default connect(mapStateToProps, {
  resetPassword,
  signIn,
  compareToken,
  sendToken,
  clearAuthInfo
})(SignIn);
