import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signIn } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import _ from 'lodash';

//components
import Navbar from './navbar';
class SignIn extends Component {
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

  emailChanged(e) {
    this.setState({
      email: e.target.value,
    });
  }
  pwChanged(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signIn(this.state).then(() => {
      console.log(this.props.signin);

      if (this.props.signin.user.success) {
        // this.props.history.push('/');
        return (window.location.href = '/');
      }
      if (this.props.signin.user.status) {
        this.setState({
          error: 'An error ocurred',
          showErrMessage: 'show',
        });
        // console.log('An error occurred');
      }
    });
  }
  render() {
    const { password, email } = this.state;
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
              <strong>Error!</strong> invalid credentials
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
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ signIn }, dispatch),
});

const mapStateToProps = state => {
  return {
    signin: state.signin,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
