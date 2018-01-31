import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pace from 'react-pace-progress';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

// Validator helper
import errorMessages, {
  validateEmail,
  validateName,
  validatePassword,
  validateMoniker,
  confirmPassword
} from './Validators';

// actions
import { signUp } from '../../actions/userActions';
import { isLoading } from '../../actions';

//component
import Navbar from '../Navbar';
import Form from './SignUpForms';

/**
 *
 *
 * @class SignUp
 * @extends {Component}
 * @param {object} nextProps
 * @param {object} event
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
      status: 'fade'
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.user.signUp) {
      if (nextProps.user.signUp.success) {
        window.location.href = '/';
      }
      if (nextProps.user.signUp.data) {
        switch (nextProps.user.signUp.data.target) {
        case 'email':
          document.querySelector('#email_error').innerHTML = `Your email address already exist in our database, sign in`;
          break;
        case 'moniker':
          document.querySelector('#moniker_error').innerHTML =
              'username already taken';
          break;
        }
      }
    }
  };

  onChange = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        if (this.state.fname) {
          validateName(this.state.fname, 'fname', 'fname_error');
        }
        if (this.state.lname) {
          validateName(this.state.lname, 'lname', 'lname_error');
        }
        if (this.state.email) {
          validateEmail(this.state.email, 'email', 'email_error');
        }
        if (this.state.password) {
          validatePassword(this.state.password, 'password', 'password_error');
        }
        if (this.state.moniker) {
          validateMoniker(this.state.moniker, 'moniker', 'moniker_error');
        }
        if (this.state.confirmPassword) {
          confirmPassword(
            this.state.password,
            this.state.confirmPassword,
            'confirmPassword',
            'cp_error'
          );
        }
      }
    );
  };
  /**
   *
   *
   * @param {any} event
   * @memberof SignUp
   * @returns {any} submits form
   */
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      firstName: event.target.elements.fname.value.trim(),
      lastName: event.target.elements.lname.value.trim(),
      email: event.target.elements.email.value.trim(),
      password: event.target.elements.password.value.trim(),
      confirmPassword: event.target.elements.confirmPassword.value.trim(),
      bio: event.target.elements.bio.value.trim(),
      moniker: event.target.elements.moniker.value,
      country: event.target.elements.country.value.trim()
    };
    if (errorMessages()) {
      this.props.signUp(data);
    }
  };
  /**
   *
   *
   * @returns {any} jsx
   * @memberof SignUp
   */
  render() {
    return (
      <section className="">
        <div className="fixed-top">
          {this.props.netReq === true ? (
            <Pace color="#e7b52c" height={2} />
          ) : null}
        </div>
        <Navbar className="bg-dark fixed-top" />
        <div className="container">
          <div
            data-aos="fade-up"
            data-duration="1000"
            className="row catalog-wrapper p-0 justify-content-center mt-80"
          >
            <div className="col-lg-6 col-sm-12 text-center AuthInfo">
              <img
                src="https://res.cloudinary.com/emasys/image/upload/v1516439649/mR_2_jwnuce.png"
                alt="logo"
                width="200"
                height="200"
                className="mt-30"
                data-aos="flip-right"
                data-aos-delay="1000"
                data-dos-duration="1000"
              />

              <h1
                data-aos="fade-up"
                data-aos-duration="2000"
                className="text-white"
              >
                Welcome !
              </h1>
              <h4
                data-aos="fade-up"
                data-aos-duration="1000"
                data-dos-delay="1000"
                className="mt-10 text-white p-10 "
              >
                “Cooking is not a science but an art, mistakes are okay, messes
                are fine—the pleasure is in the creating and the sharing of the
                result.” ― Lori Pollan
              </h4>
            </div>
            <div className=" col-lg-6 col-md-6 justify-content-center col-sm-12">
              <Form handleSubmit={this.handleSubmit} onChange={this.onChange} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

SignUp.propTypes = {
  user: PropTypes.object,
  signUp: PropTypes.func,
  netReq: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user,
  netReq: state.netReq
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ signUp, isLoading }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
