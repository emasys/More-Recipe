import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import lodash from 'lodash';
import Pace from 'react-pace-progress';
import Textarea from "react-textarea-autosize";

// actions
import * as actions from '../actions';


//component
import Navbar from './Navbar';
import Countries from './CountryList';
/**
 *
 *
 * @class SignUp
 * @extends {Component}
 */
export class SignUp extends Component {
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
      isLoading: false
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
      country: e.target.elements.country.value.trim()
    };

    // Test for whitespace and digits
    const re = /[\s\d]/;
    // Tests for alphanumeric characters only
    const reMoniker = /^[a-z0-9]+$/i;
    let submitData = 0;
    if (re.test(data.lastName) || data.lastName === '') {
      document.querySelector('#lastname_error').innerHTML =
        'Please enter a valid name';
    } else {
      document.querySelector('#lastname_error').innerHTML = '';
      submitData += 1;
    }
    if (re.test(data.firstName) || data.firstName === '') {
      document.querySelector('#firstname_error').innerHTML =
        'Please enter a valid name';
    } else {
      document.querySelector('#firstname_error').innerHTML = '';
      submitData += 1;
    }
    if (!reMoniker.test(data.moniker)) {
      console.log(reMoniker.test(data.moniker));
      document.querySelector('#moniker_error').innerHTML =
        'Alphanumeric characters only';
    } else {
      document.querySelector('#moniker_error').innerHTML = '';
      submitData += 1;
    }
    if (data.email === '') {
      document.querySelector('#email_error').innerHTML =
        'Please enter a valid email address';
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

    if (!lodash.isEqual(data.password, data.confirmPassword)) {
      document.querySelector('#cp_error').innerHTML =
        'Your password did not match';
    } else {
      document.querySelector('#cp_error').innerHTML = '';
      submitData += 1;
    }

    if (submitData === 6) {
      this.setState({
        isLoading: true
      });
      this.props.signUp(data).then(() => {
        if (this.props.user.signUp.success) {
          window.location.href = '/';
        } else {
          switch (this.props.user.signUp.target) {
          case 'email':
            document.querySelector('#email_error').innerHTML = `Your email address already exist in our database, sign in`;
            this.setState({
              isLoading: false
            });
            break;
          case 'moniker':
            document.querySelector('#moniker_error').innerHTML =
                'Your username already taken';
            this.setState({
              isLoading: false
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
    return (
      <section className="container ">
        <div className="fixed-top">
          {this.state.isLoading ? <Pace color="#e7b52c" height={2} /> : null}
        </div>
        <Navbar />
        <div className="row justify-content-center mt-80">
          <div className="col-lg-6 col-sm-12 text-center ">
            <img src="../img/logo.png" alt="logo" />
            <p className=" mt-5 text-dark bg-mirror header-title">
              “Cooking is not a science but an art, mistakes are okay, messes
              are fine—the pleasure is in the creating and the sharing of the
              result.” ― Lori Pollan
            </p>
            <p>
              If you already have an account,{' '}
              <Link to="/signin" className="btn btn-lg btn-outline-dark">
                {' '}
                Sign In
              </Link>
            </p>
          </div>
          <div className="catalog-wrapper col-lg-6 col-md-10 justify-content-center col-sm-12">
            <form onSubmit={this.handleSubmit}>
              <ul className="form row p-3">
                <li className="col-12">
                  <label>First Name</label>
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    className="col-12"
                    name="fname"
                  />
                  <div className="text-danger" id="firstname_error" />
                </li>
                <li className="col-12">
                  <label>Last Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    className="col-12"
                    name="lname"
                    id="inputLName"
                  />
                  <div className="text-danger" id="lastname_error" />
                </li>
                <li className="col-12">
                  <label>Email</label>
                  <input
                    type="email"
                    required
                    className="col-12"
                    name="email"
                    placeholder="example@example.com"
                  />
                  <div className="text-danger" id="email_error" />
                </li>
                <li className="col-12">
                  <label>Username</label>
                  <input
                    type="text"
                    required
                    className="col-12"
                    name="moniker"
                    placeholder="johnDoe23"
                  />
                  <div className="text-danger" id="moniker_error" />
                </li>

                <li className="col-12">
                  <label>Password</label>
                  <input
                    type="password"
                    required
                    className="col-12"
                    name="pass"
                    placeholder="**********"
                  />
                  <div className="text-danger" id="password_error" />
                </li>
                <li className="col-12">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    required
                    className="col-12"
                    name="cpass"
                    placeholder="**********"
                  />
                  <div className="text-danger" id="cp_error" />
                </li>
                <li className="special col-12">
                  <label>Country</label>

                  <select
                    name="country"
                    className="col-12 "
                    style={{ height: '50px' }}
                  >
                    {Countries.map(country => (
                      <option key={country.code} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </li>
                <li className="special col-12">
                  <label>Bio</label>
                  <Textarea
                    className="col-12"
                    id="FormControlTextarea"
                    placeholder="optional"
                    name="bio"
                    minRows={3}
                    maxRows={50}
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
              </ul>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });
export default connect(mapStateToProps, actions)(SignUp);
