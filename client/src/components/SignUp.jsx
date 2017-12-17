import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import * as actions from '../actions';
import config from '../config';

//component
import Navbar from './Navbar';
import Countries from './CountryList';
/**
 *
 *
 * @class SignUp
 * @extends {Component}
 */
class SignUp extends Component {
  /**
   * Creates an instance of SignUp.
   * @param {any} props
   * @memberof SignUp
   */
  constructor(props) {
    super(props);

    this.state = {
      preview: null,
      files: null,
      status: 'fade',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }
  /**
 *
 *
 * @param {any} files
 * @memberof SignUp
 * @return {object} file preview
 */
  handleDrop(files) {
    const [{ preview }] = files;
    console.log(files);
    this.setState({ preview, files });
  }
  /**
 *
 *
 * @param {any} e
 * @memberof SignUp
 * @returns {any} submits form
 */
  handleSubmit(e) {
    e.preventDefault();
    const data = {
      firstName: e.target.elements.fname.value.trim(),
      lastName: e.target.elements.lname.value.trim(),
      email: e.target.elements.email.value.trim(),
      password: e.target.elements.pass.value.trim(),
      confirmPassword: e.target.elements.cpass.value.trim(),
      bio: e.target.elements.bio.value.trim(),
      moniker: e.target.elements.moniker.value,
      country: e.target.elements.country.value.trim(),
    };

    const { files } = this.state;

    // Test for whitespace and digits
    const re = /[\s\d]/;
    // Tests for alphanumeric characters only
    const reMoniker = /^[a-z0-9]+$/i;
    let submitData = 0;
    if (re.test(data.lastName) || data.lastName === '') {
      document.querySelector('#lastname_error')
        .innerHTML = 'Please enter a valid name';
    } else {
      document.querySelector('#lastname_error').innerHTML = '';
      submitData += 1;
    }
    if (re.test(data.firstName) || data.firstName === '') {
      document.querySelector('#firstname_error')
        .innerHTML = 'Please enter a valid name';
    } else {
      document.querySelector('#firstname_error').innerHTML = '';
      submitData += 1;
    }
    if (!reMoniker.test(data.moniker)) {
      console.log(reMoniker.test(data.moniker));
      document.querySelector('#moniker_error')
        .innerHTML = 'Alphanumeric characters only';
    } else {
      document.querySelector('#moniker_error').innerHTML = '';
      submitData += 1;
    }
    if (data.email === '') {
      document.querySelector('#email_error')
        .innerHTML = 'Please enter a valid email address';
    } else {
      document.querySelector('#email_error').innerHTML = '';
      submitData += 1;
    }

    if (data.password.length < 8) {
      document.querySelector('#password_error').innerHTML =
        'Please enter a valid password not less than 8 characters';
    } else {
      document.querySelector('#password_error').innerHTML = '';
      submitData += 1;
    }

    if (!_.isEqual(data.password, data.confirmPassword)) {
      document.querySelector('#cp_error')
        .innerHTML = 'Your password did not match';
    } else {
      document.querySelector('#cp_error').innerHTML = '';
      submitData += 1;
    }

    if (submitData === 6) {
      this.setState({
        status: 'show',
      });
      this.props.signUp(data).then(() => {
        if (this.props.user.user.success) {
          window.location.href = '/';
        } else {
          switch (this.props.user.user.target) {
          case 'email':
            document.querySelector('#email_error').innerHTML =
                    'Your email address already exist in our database';
            this.setState({
              status: 'fade',
            });
            break;
          case 'moniker':
            document.querySelector('#moniker_error').innerHTML =
                    'Your username already taken';
            this.setState({
              status: 'fade',
            });
            break;
          }
        }
      });
    }
  }
  /**
 *
 *
 * @returns {any} jsx
 * @memberof SignUp
 */
  render() {
    const { status } = this.state;
    return (
      <section className="container ">
        <Navbar />
        <div className="row justify-content-center mt-80">
          <div className="col-lg-6 col-sm-12 text-center ">
            <img src="../img/logo.png" alt="logo" />
            <p className=" mt-5 text-dark bg-mirror header-title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              If you already have an account,{' '}
              <Link to="/signin" className="btn btn-lg btn-outline-dark">
                {' '}
                Sign In
              </Link>
            </p>
          </div>
          <div className="catalog-wrapper col-lg-6 justify-content-center col-sm-12">
            <form onSubmit={this.handleSubmit}>
              <ul className="form row pl-2">
                <li className="col-lg-6 col-sm-12">
                  <label>First Name</label>
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    className="col-lg-11 col-sm-12"
                    name="fname"
                  />
                  <div className="text-danger" id="firstname_error" />
                </li>
                <li className="col-lg-6 col-sm-12">
                  <label>Last Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    className="col-lg-11 col-sm-12"
                    name="lname"
                    id="inputLName"
                  />
                  <div className="text-danger" id="lastname_error" />
                </li>
                <li className="col-lg-6 col-sm-12">
                  <label>Email</label>
                  <input
                    type="email"
                    required
                    className="col-lg-11 col-sm-12"
                    name="email"
                    placeholder="example@example.com"
                  />
                  <div className="text-danger" id="email_error" />
                </li>
                <li className="col-lg-6 col-sm-12">
                  <label>Username</label>
                  <input
                    type="text"
                    required
                    className="col-lg-11 col-sm-12"
                    name="moniker"
                    placeholder="johnnyDoe23"
                  />
                  <div className="text-danger" id="moniker_error" />
                </li>

                <li className="col-lg-6 col-sm-12">
                  <label>Password</label>
                  <input
                    type="password"
                    required
                    className="col-lg-11 col-sm-12"
                    name="pass"
                    placeholder="**********"
                  />
                  <div className="text-danger" id="password_error" />
                </li>
                <li className="col-lg-6 col-sm-12">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    required
                    className="col-lg-11 col-sm-12"
                    name="cpass"
                    placeholder="**********"
                  />
                  <div className="text-danger" id="cp_error" />
                </li>
                <li className="special col-lg-6 col-sm-12">
                  <label>Country</label>

                  <select
                    name="country"
                    className="col-lg-11 col-sm-12 "
                    style={{ height: '50px' }}
                  >
                    {Countries.map(country => (
                      <option key={country.code} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </li>
                <li className="special col-lg-6 col-sm-12">
                  <label>Bio</label>
                  <textarea
                    className="col-lg-11 col-sm-12"
                    id="FormControlTextarea"
                    name="bio"
                    required
                    rows="4"
                  />
                </li>

                <li className=" col-12 ">
                  <input
                    type="submit"
                    value="submit"
                    id="submit"
                    className="btn bg-dark btn hovered"
                  />
                </li>
                <li className={`col-12 text-center ${status}`}>
                  <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
                  <span className="sr-only">Loading...</span>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </section>
    );
  }
}


const mapStateToProps = state => ({ user: state.signup });
export default connect(mapStateToProps, actions)(SignUp);
