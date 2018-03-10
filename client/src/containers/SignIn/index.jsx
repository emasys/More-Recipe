import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { toast, ToastContainer } from 'react-toastify';
import { validate } from 'email-validator';

// actions
import {
  resetPassword,
  signIn,
  compareToken,
  sendToken
} from '../../actions/authActions';

//components
import Navbar from '../../components/Navbar';
import SignInForm from './SignInForm';
import ResetPasswordForm from './ResetPassword';
import errorMessages, {
  validateEmail,
  validatePassword,
  confirmPassword
} from '../SignUp/Validators';

/**
 *
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
      success: false,
      showProps: false,
      resetPass: false
    };
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
   * @memberof SignIn
   */
  componentWillReceiveProps(nextProps) {
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
      } else {
        document.querySelector('#recoverEmail_error').innerHTML =
          "User account not found, <a href='/signup'>sign up</a>";
      }
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps.signin.signIn) {
      if (nextProps.isLoading) return false;
      return true;
    }
    return true;
  };

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
   * @param {object} event
   * @memberof SignIn
   * @returns {object} state change
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
   * @returns {void}
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
   * @param {void} event
   * 
   * @memberof SignIn
   * 
   * @returns {void}
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

  /**
   * Generate Token
   * 
   * @param {object} event
   * 
   * @returns {void}
   * 
   * @memberOf SignIn
   */
  generateToken = event => {
    event.preventDefault();
    if (validate(this.state.recoveryEmail)) {
      this.props.sendToken({ email: this.state.recoveryEmail }).then(() => {
        if (this.props.tokenStatus && this.props.tokenStatus.data) {
          document.querySelector('#recoverEmail_error').innerHTML =
            'This email address is not in our records';
        } else {
          document.form.sendToken.innerHTML = 'Re-send token';
          Array.from(document.querySelectorAll('.hideForm')).forEach(element =>
            element.classList.add('d-block'));
          this.tokenSent();
        }
      });
    }
  };
  /**
   *
   *
   * @param {object} event
   * 
   * @memberof SignIn
   * 
   * @returns {void}
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
  reset: state.user.reset,
  isLoading: state.isLoading,
  tokenStatus: state.user.sendToken
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
