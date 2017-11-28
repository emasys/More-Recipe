import React, { Component } from 'react';
import { signUp } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

//component
import Navbar from './navbar';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const file = document.querySelector('input[type=file]').files[0];
    const data = {
      firstName: e.target.elements.fname.value.trim(),
      lastName: e.target.elements.lname.value.trim(),
      email: e.target.elements.email.value.trim(),
      password: e.target.elements.pass.value.trim(),
      confirmPassword: e.target.elements.cpass.value.trim(),
      bio: e.target.elements.bio.value.trim(),
      moniker: e.target.elements.moniker.value.trim(),
      country: e.target.elements.country.value.trim(),
      avatar: file
    };
    const re = /[\s\d]/;
    let submit_data = 0;
    if (re.test(data.lastName) || data.lastName === '') {
      document.querySelector('#lastname_error').innerHTML =
        'Please enter a valid name';
    } else {
      document.querySelector('#lastname_error').innerHTML = '';
      submit_data += 1;
    }
    if (re.test(data.firstName) || data.firstName === '') {
      document.querySelector('#firstname_error').innerHTML =
        'Please enter a valid name';
    } else {
      document.querySelector('#firstname_error').innerHTML = '';
      submit_data += 1;
    }
    if (data.moniker === '') {
      document.querySelector('#moniker_error').innerHTML =
        'This field is required';
    } else {
      document.querySelector('#moniker_error').innerHTML = '';
      submit_data += 1;
    }
    if (data.email === '') {
      document.querySelector('#email_error').innerHTML =
        'Please enter a valid email address';
    } else {
      document.querySelector('#email_error').innerHTML = '';
      submit_data += 1;
    }

    if (data.password.length < 8) {
      document.querySelector('#password_error').innerHTML =
        'Please enter a valid password not less than 8 characters';
    } else {
      document.querySelector('#password_error').innerHTML = '';
      submit_data += 1;
    }

    if (!_.isEqual(data.password, data.confirmPassword)) {
      document.querySelector('#cp_error').innerHTML =
        'Your password did not match';
    } else {
      document.querySelector('#cp_error').innerHTML = '';
      submit_data += 1;
    }

    console.log(submit_data);
    if (submit_data === 6) {
      this.props.signUp(data).then(() => {
        if (this.props.user.user.success) {
          return (window.location.href = '/');
        } else {
          switch (this.props.user.user.target) {
            case 'email':
              document.querySelector('#email_error').innerHTML =
                'Your email address already exist in our database';
              break;
            case 'moniker':
              document.querySelector('#moniker_error').innerHTML =
                'Your username already exist in our database';
              break;
          }
        }
      });
    }

    // this.props.history.push('/');
    // return (window.location.href = '/');
  }
  render() {
    return (
      <section className="container ">
        <Navbar />
        <div className="row justify-content-center mt-80">
          <div className="col-lg-6 col-sm-12 text-center ">
            <img src="../img/logo.png" alt="logo" />
            <p className=" mt-5 text-dark bg-mirror header-title">
              “I hate the notion of a secret recipe. Recipes are by nature
              derivative and meant to be shared that is how they improve, are
              changed, how new ideas are formed. To stop a recipe in it's
              tracks, to label it "secret" just seems mean.” ― Molly Wizenberg
            </p>
          </div>
          <div className="catalog-wrapper col-lg-6 justify-content-center  col-sm-12">
            <form onSubmit={this.handleSubmit}>
              <ul className="form row pl-5">
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
                    id="inputEmail"
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
                    id="inputEmail"
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
                    id="inputPassword4"
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
                    id="inputPassword4"
                    placeholder="**********"
                  />
                  <div className="text-danger" id="cp_error" />
                </li>
                <li className="special col-lg-6 col-sm-12">
                  <label>Country</label>
                  <select name="country" className="col-lg-11 col-sm-12 ">
                    <option value="nigeria">Nigeria</option>
                  </select>
                </li>
                <li className=" col-lg-6 col-sm-12">
                  <label>Upload Avatar</label>
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    className=" form-control-file"
                  />
                </li>
                <li className=" col-lg-12 col-sm-12">
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
                    className="bg-dark btn hovered"
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

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ signUp }, dispatch)
});

const mapStateToProps = state => {
  console.log(state.signup);
  return {
    user: state.signup
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
