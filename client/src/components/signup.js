import React, { Component } from 'react';
import { signUp } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//component
import Navbar from './navbar';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // this.signup(this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    const file = document.querySelector('input[type=file]').files[0];
    const data = {
      firstName: e.target.elements.fname.value,
      lastName: e.target.elements.lname.value,
      email: e.target.elements.email.value,
      password: e.target.elements.pass.value,
      confirmPassword: e.target.elements.cpass.value,
      bio: e.target.elements.bio.value,
      country: e.target.elements.country.value,
      avatar: file
    };
    this.props.signUp(data);
    console.log(data);
    // this.props.history.push('/');
  }
  render() {
    return (
      <section className="container ">
        <Navbar />
        <div className="row justify-content-center mt-80">
          <div className="catalog-wrapper">
            <form onSubmit={this.handleSubmit}>
              <ul className="form row">
                <li className="col-lg-6 col-sm-12">
                  <label>First Name</label>
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    className="col-lg-11 col-sm-12"
                    name="fname"
                    id="inputFName"
                  />
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
                </li>
                <li className="col-lg-6 col-sm-12">
                  <label>email</label>
                  <input
                    type="email"
                    required
                    className="col-lg-11 col-sm-12"
                    name="email"
                    id="inputEmail"
                    placeholder="example@example.com"
                  />
                </li>
                <li className="special col-lg-6 col-sm-12">
                  <label>Country</label>
                  <select name="country" className="col-lg-11 col-sm-12 ">
                    <option value="nigeria">Nigeria</option>
                  </select>
                </li>
                <li className="col-lg-6 col-sm-12">
                  <label>
                    Password
                    <code>8-20 characters</code>
                  </label>
                  <input
                    type="password"
                    required
                    className="col-lg-11 col-sm-12"
                    name="pass"
                    id="inputPassword4"
                    placeholder="**********"
                  />
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
                </li>
                <li className=" col-lg-6 col-sm-12">
                  <label>Bio</label>
                  <textarea
                    className="col-lg-11 col-sm-12"
                    id="FormControlTextarea"
                    name="bio"
                    rows="4"
                  />
                </li>
                <li className=" col-lg-6 col-sm-12">
                  <label>Upload Avatar</label>
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    className="btn btn-dark"
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
  return {
    user: state.signup
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
