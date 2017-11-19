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
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      bio: ''
    };

    this.fnChanged = this.fnChanged.bind(this);
    this.lnChanged = this.lnChanged.bind(this);
    this.emailChanged = this.emailChanged.bind(this);
    this.bioChanged = this.bioChanged.bind(this);
    this.pwChanged = this.pwChanged.bind(this);
    this.cpChanged = this.cpChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // this.signup(this.state);
  }

  fnChanged(e) {
    this.setState({
      firstName: e.target.value
    });
  }
  lnChanged(e) {
    this.setState({
      lastName: e.target.value
    });
  }
  emailChanged(e) {
    this.setState({
      email: e.target.value
    });
  }
  pwChanged(e) {
    this.setState({
      password: e.target.value
    });
  }
  cpChanged(e) {
    this.setState({
      confirmPassword: e.target.value
    });
  }
  bioChanged(e) {
    this.setState({
      bio: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.signUp(this.state);
    this.props.history.push('/');
  }
  render() {
    const {
      bio,
      confirmPassword,
      email,
      firstName,
      lastName,
      password
    } = this.state;
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
                    name="firstName"
                    id="inputFName"
                    value={firstName}
                    onChange={this.fnChanged}
                  />
                </li>
                <li className="col-lg-6 col-sm-12">
                  <label>Last Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    className="col-lg-11 col-sm-12"
                    name="lastName"
                    value={lastName}
                    onChange={this.lnChanged}
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
                    value={email}
                    onChange={this.emailChanged}
                    id="inputEmail"
                    placeholder="example@example.com"
                  />
                </li>
                <li className="special col-lg-6 col-sm-12">
                  <label>Country</label>
                  <select className="col-lg-11 col-sm-12 ">
                    <option value="Nigeria">Nigeria</option>
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
                    name="password"
                    value={password}
                    onChange={this.pwChanged}
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
                    value={confirmPassword}
                    onChange={this.cpChanged}
                    name="confirmPassword"
                    id="inputPassword4"
                    placeholder="**********"
                  />
                </li>
                <li className=" col-lg-6 col-sm-12">
                  <label>Bio</label>
                  <textarea
                    className="col-lg-11 col-sm-12"
                    id="FormControlTextarea"
                    value={bio}
                    onChange={this.bioChanged}
                    name="bio"
                    rows="4"
                  />
                </li>

                <li className=" col-12 ">
                  <input
                    type="submit"
                    value="submit"
                    id="submit"
                    className="bg-dark"
                  />
                </li>
              </ul>
            </form>
            {/* <form onSubmit={this.handleSubmit}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputFName" className="col-form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    id="inputFName"
                    value={firstName}
                    onChange={this.fnChanged}
                    placeholder="First name"
                  />
                </div> */}
            {/* <div className="form-group col-md-6">
                  <label htmlFor="inputLName" className="col-form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={this.lnChanged}
                    className="form-control"
                    id="inputLName"
                    placeholder="Last Name"
                  />
                </div> */}
            {/* </div> */}
            {/* <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="inputEmail4" className="col-form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.emailChanged}
                    className="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                  />
                </div> */}
            {/* <div className="form-group col-md-4">
                  <label htmlFor="inputPassword4" className="col-form-label">
                    Password
                    <code>8-20 characters</code>
                  </label>
                  <input
                    <code>8-20 characters</code>
                    
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.pwChanged}
                    className="form-control"
                    id="inputPassword4"
                    placeholder="**********"
                  />
                </div> */}
            {/* <div className="form-group col-md-4">
                  <label htmlFor="inputPassword4" className="col-form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={this.cpChanged}
                    name="confirmPassword"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="**********"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="FormControlTextarea">Bio</label>
                  <textarea
                    className="form-control"
                    id="FormControlTextarea"
                    value={bio}
                    onChange={this.bioChanged}
                    name="bio"
                    rows="4"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-dark">
                Sign up
              </button>
              {` `}
              <Link to="/signin" className="btn btn-dark">
                Sign up
              </Link>
            </form> */}
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
