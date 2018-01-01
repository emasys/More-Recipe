import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';

// actions
import * as actions from '../actions';

//components
import Navbar from './Navbar';
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

    this.emailChanged = this.emailChanged.bind(this);
    this.pwChanged = this.pwChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
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
   * @param {any} e
   * @memberof SignIn
   * @returns {any} email input text
   */
  emailChanged(e) {
    this.setState({
      email: e.target.value
    });
  }
  /**
   *
   *
   * @param {any} e
   * @memberof SignIn
   * @returns {any} password input text
   */
  pwChanged(e) {
    this.setState({
      password: e.target.value
    });
  }
  /**
   *
   *
   * @memberof SignIn
   * @returns {any} password input text
   */
  resetForm() {
    this.setState({
      resetPassword: true,
      success: false
    });
  }
  /**
   *
   *
   * @param {any} event
   * @memberof SignIn
   * @returns {any}
   * triggers reset password action
   */
  resetPassword(event) {
    event.preventDefault();
    console.log(event.target.elements.recoveryEmail.value);
    const data = {
      email: event.target.elements.recoveryEmail.value.trim(),
      password: event.target.elements.newPassword.value,
      confirmPassword: event.target.elements.confirmPassword.value
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

    if (!isEqual(data.password, data.confirmPassword)) {
      document.querySelector('#confirmPassword_error').innerHTML =
        'Your password did not match';
      data.confirmPassword = null;
    } else {
      document.querySelector('#confirmPassword_error').innerHTML = '';
    }

    if (data.email && data.confirmPassword && data.password) {
      this.props.resetPassword(data);
    }
  }
  /**
   *
   *
   * @param {any} e
   * @memberof SignIn
   * @returns {any} a new page
   */
  handleSubmit(e) {
    e.preventDefault();

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
  }
  /**
   *
   *
   * @returns {any} jsx
   * @memberof SignIn
   */
  render() {
    const {
      email, message, showProps, resetPassword, success
    } = this.state;
    return (
      <section className="container mt-100 mb-100 ">
        <Navbar />
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
        <div className="row justify-content-center">
          <div className="col-lg-8 col-sm-12 text-center ">
            <img src="../img/logo.png" alt="logo" />
            <p className=" mt-5 text-dark bg-mirror header-title">
              Welcome back!<br />
              We trust it's been an amazing experience for you so far... Let's
              continue to add spices to life.
            </p>
            <p className="text-danger">
              Forgot your password? {` `}
              <button onClick={this.resetForm} className="btn btn-dark ">
                Reset it!
              </button>
            </p>
            <p>
              Don't have an account? {` `}
              <Link to="/signup" className="btn btn-dark">
                Sign Up!
              </Link>
            </p>
          </div>
          <div className="col-lg-4 col-sm-12 ">
            {!resetPassword && (
              <form
                id="signin"
                className="form-items"
                onSubmit={this.handleSubmit}
              >
                <ul className="form row">
                  <li className="col-lg-12 col-sm-12">
                    <label>Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={this.emailChanged}
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
                      onChange={this.pwChanged}
                      className="col-lg-12 col-sm-12"
                      name="pass"
                      id="inputPassword"
                      placeholder="**********"
                    />
                    <div
                      className={`text-danger ${this.state.showErrMessage}`}
                      id="moniker_error"
                    >
                      Invalid email or password
                    </div>
                  </li>
                  <li className="col-lg-12 col-sm-12">
                    <button type="submit" className="btn btn-dark btn-lg ">
                      Sign in
                    </button>&nbsp;
                    <Link to="/signup" className="btn btn-dark btn-lg">
                      Sign up
                    </Link>
                  </li>
                </ul>
              </form>
            )}
            {resetPassword && (
              <form className="form-items" onSubmit={this.resetPassword}>
                <ul className="form row">
                  <li className="col-lg-12 col-sm-12">
                    <label>Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={this.emailChanged}
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
                    <button
                      type="submit"
                      className="btn btn-dark btn-block btn-lg "
                    >
                      Save New Password
                    </button>
                  </li>
                </ul>
              </form>
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
