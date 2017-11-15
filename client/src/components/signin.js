import React, { Component } from 'react';
import { signIn } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import _ from 'lodash';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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
    this.props.signIn(this.state);

    this.props.history.push('/profile');
  }
  render() {
    // let _props = this.props.signin;
    const { password, email } = this.state;

    // if (Object.keys(_props).length) {
    //   window.localStorage.setItem('token', _props.user.token);

    //   console.log(_props.user.token);
    // }
    return (
      <section className="container ">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-sm-12 form-items">
            <form id="signin" onSubmit={this.handleSubmit}>
              <div className="form-row">
                <div className="form-group col-12">
                  <label for="inputEmail4" className="col-form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={this.emailChanged}
                    className="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label for="inputPassword4" className="col-form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    onChange={this.pwChanged}
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Password"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-dark">
                Sign in
              </button>
              <a href="signup.html" className="btn btn-dark">
                Sign up
              </a>
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
