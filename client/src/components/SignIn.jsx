import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
      error: '',
      showErrMessage: 'hide',
    };

    this.emailChanged = this.emailChanged.bind(this);
    this.pwChanged = this.pwChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      email: e.target.value,
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
      password: e.target.value,
    });
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
      if (this.props.signin.user.success) {
        let linkPath = "/";
        if (this.props.match.params) {
          linkPath = this.props.location.pathname;
          if (linkPath === '/signin') linkPath = '/';
        }
        window.location.href = linkPath;
      }
      if (this.props.signin.user.status) {
        this.setState({
          error: 'An error ocurred',
          showErrMessage: 'show',
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
    const { email } = this.state;
    return (
      <section className="container mt-100 mb-100 ">
        <Navbar />
        <div className="row justify-content-center">
          <div className="col-lg-8 col-sm-12 text-center ">
            <img src="../img/logo.png" alt="logo" />
            <p className=" mt-5 text-dark bg-mirror header-title">
              “I hate the notion of a secret recipe. Recipes are by nature derivative and meant to
              be shared that is how they improve, are changed, how new ideas are formed. To stop a
              recipe in it's tracks, to label it "secret" just seems mean.” ― Molly Wizenberg
            </p>
          </div>
          <div className="col-lg-4 col-sm-12 ">
            <div
              className={`alert alert-danger alert-dismissible fade ${this.state.showErrMessage}`}
              role="alert"
            >
              <strong>Error!</strong> Your email or password is incorrect
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form id="signin" className="form-items" onSubmit={this.handleSubmit}>
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
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  signin: state.signin,
});

export default connect(mapStateToProps, actions)(SignIn);
