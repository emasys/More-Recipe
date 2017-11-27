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
      showErrMessage: 'hide'
    };

    this.emailChanged = this.emailChanged.bind(this);
    this.pwChanged = this.pwChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    this.props.signIn(this.state).then(() => {
      // console.log(this.props.signin.user);
      if (this.props.signin.user.success) {
        // this.props.history.push('/');
        return (window.location.href = '/');
      }
      if (this.props.signin.user.status) {
        this.setState({
          error: 'An error ocurred',
          showErrMessage: 'show'
        });
        // console.log('An error occurred');
      }
    });
  }
  render() {
    const { password, email } = this.state;
    return (
      <section className="container ">
        <Navbar />
        <div className="row justify-content-center">
          <div className="col-lg-4 col-sm-12 ">
            <div
              className={`alert alert-danger alert-dismissible fade ${
                this.state.showErrMessage
              }`}
              role="alert"
            >
              <strong>Error!</strong> invalid credentials
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form
              id="signin"
              className="form-items"
              onSubmit={this.handleSubmit}
            >
              <div className="form-row">
                <div className="form-group col-12">
                  <label htmlFor="inputEmail4" className="col-form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    required
                    onChange={this.emailChanged}
                    className="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="inputPassword4" className="col-form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    onChange={this.pwChanged}
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Password"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-dark">
                Sign in
              </button>&nbsp;
              <Link to="/signup" className="btn btn-dark">
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
  ...bindActionCreators({ signIn }, dispatch)
});

const mapStateToProps = state => {
  return {
    signin: state.signin
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
