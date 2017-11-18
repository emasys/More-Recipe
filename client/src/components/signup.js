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
    this.props.history.push('/profile');
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
        <div className="row justify-content-center">
          <div className="col-lg-8 col-sm-12 form-items">
            <form onSubmit={this.handleSubmit}>
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
                </div>
                <div className="form-group col-md-6">
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
                </div>
              </div>
              <div className="form-row">
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
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="inputPassword4" className="col-form-label">
                    Password
                    <code>8-20 characters</code>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.pwChanged}
                    className="form-control"
                    id="inputPassword4"
                    placeholder="**********"
                  />
                </div>
                <div className="form-group col-md-4">
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
