import React, { Component } from 'react';
import { signUp } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Dropzone from 'react-dropzone';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import axios from 'axios';
import config from '../config';

//component
import Navbar from './Navbar';
import Countries from './CountryList';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: null,
      files: null,
      status: 'fade',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDropRejected = this.handleDropRejected.bind(this);
  }

  handleDrop(files) {
    const [{ preview }] = files;
    console.log(files);
    this.setState({ preview, files });
  }
  handleDropRejected(...args) {
    return console.log('reject', args);
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
    };

    const { files } = this.state;

    const re = /[\s\d]/;
    let submit_data = 0;
    if (re.test(data.lastName) || data.lastName === '') {
      document.querySelector('#lastname_error').innerHTML = 'Please enter a valid name';
    } else {
      document.querySelector('#lastname_error').innerHTML = '';
      submit_data += 1;
    }
    if (re.test(data.firstName) || data.firstName === '') {
      document.querySelector('#firstname_error').innerHTML = 'Please enter a valid name';
    } else {
      document.querySelector('#firstname_error').innerHTML = '';
      submit_data += 1;
    }
    if (data.moniker === '') {
      document.querySelector('#moniker_error').innerHTML = 'This field is required';
    } else {
      document.querySelector('#moniker_error').innerHTML = '';
      submit_data += 1;
    }
    if (data.email === '') {
      document.querySelector('#email_error').innerHTML = 'Please enter a valid email address';
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
      document.querySelector('#cp_error').innerHTML = 'Your password did not match';
    } else {
      document.querySelector('#cp_error').innerHTML = '';
      submit_data += 1;
    }

    // Push all the axios request promise into a single array
    let uploaders = null;
    if (files) {
      uploaders = files.map(file => {
        // Initial FormData
        const formData = new FormData();
        formData.append('file', file);
        formData.append('tags', `avatar`);
        formData.append('upload_preset', config.UPLOAD_PRESET);
        formData.append('api_key', config.API_KEY);
        formData.append('timestamp', (Date.now() / 1000) | 0);

        return axios
          .post('https://api.cloudinary.com/v1_1/emasys/image/upload', formData, {
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
          })
          .then(response => {
            const resdata = response.data;
            data.avatar = resdata.secure_url;
          });
      });
    }
    if (uploaders) {
      axios.all(uploaders).then(() => {
        console.log(submit_data);

        if (submit_data === 6) {
          this.setState({
            status: 'show',
          });
          this.props.signUp(data).then(() => {
            if (this.props.user.user.success) {
              return (window.location.href = '/');
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
      });
    }
  }
  render() {
    const { preview, status } = this.state;

    return (
      <section className="container ">
        <Navbar />
        <div className="row justify-content-center mt-80">
          <div className="col-lg-6 col-sm-12 text-center ">
            <img src="../img/logo.png" alt="logo" />
            <p className=" mt-5 text-dark bg-mirror header-title">
              “I hate the notion of a secret recipe. Recipes are by nature derivative and meant to
              be shared that is how they improve, are changed, how new ideas are formed. To stop a
              recipe in it's tracks, to label it "secret" just seems mean.” ― Molly Wizenberg
            </p>
            <p>
              If you already have an account,{' '}
              <Link to="/signin" className="btn btn-lg btn-outline-dark">
                {' '}
                Sign In
              </Link>
            </p>
          </div>
          <div className="catalog-wrapper col-lg-6 justify-content-center  col-sm-12">
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

                  <select
                    name="country"
                    className="col-lg-11 col-sm-12 "
                    style={{ height: '50px' }}
                  >
                    {Countries.map(country => {
                      return (
                        <option key={country.code} value={country.name}>
                          {country.name}
                        </option>
                      );
                    })}
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
                <li className=" col-lg-6 col-sm-12">
                  <div className="col-lg-11 col-sm-12">
                    <Dropzone
                      onDrop={this.handleDrop}
                      accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png"
                      multiple={false}
                      required
                      onDropRejected={this.handleDropRejected}
                      className=" p-10 text-center dropzone bg-light"
                    >
                      Drag a file here or click to upload your display image
                    </Dropzone>
                  </div>
                </li>
                <li className=" col-lg-6 col-sm-12">
                  {preview && (
                    <img src={preview} className="col-lg-11 col-sm-12" alt="image preview" />
                  )}
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

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ signUp }, dispatch),
});

const mapStateToProps = state => {
  console.log(state.signup);
  return {
    user: state.signup,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
