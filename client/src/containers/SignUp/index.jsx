import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

// Validator helper
import errorMessages, {
  validateEmail,
  validatePassword,
  validateMoniker,
  confirmPassword
} from './Validators';

// actions
import { signUp } from '../../actions/authActions';

//component
import Navbar from '../../components/Navbar';
import Form from './SignUpForms';

/**
 *
 *
 * @class SignUp
 * @extends {Component}
 * @param {object} event
 * @param {string} inputName
 * @param {object} nextProps
 */
class SignUp extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    signUp: PropTypes.func.isRequired
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.user.signUp) {
      if (nextProps.user.signUp.success) {
        window.location.href = '/';
      }
      if (nextProps.user.signUp.data) {
        switch (nextProps.user.signUp.data.error[0].path) {
        case 'email':
          document.querySelector('#email_error').innerHTML = `Your email address already exist.`;
          break;
        case 'moniker':
          document.querySelector('#moniker_error').innerHTML =
              'username already taken';
          break;
        }
      }
    }
  };

  onFocused = inputName => {
    document.querySelector(`#${inputName}`).innerHTML = '';
  };
  onChange = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
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
      email: event.target.elements.email.value.trim(),
      password: event.target.elements.password.value.trim(),
      confirmPassword: event.target.elements.confirmPassword.value.trim(),
      moniker: event.target.elements.moniker.value
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
        <Navbar className="bg-dark fixed-top" />
        <div className="container">
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="row p-0 justify-content-center mt-80"
          >
            <div className="catalog-wrapper col-lg-6 col-md-9 p-0">
              <div className="col-12 text-center AuthInfo">
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

                <h1 className="text-white">Just one last step</h1>
                <h4 className="mt-10 text-white p-10 ">
                  We are extremely glad you have decided to join this elite
                  family of recipe explorer, together we will make sure the
                  world always have quality meals on their table. Thank You!
                </h4>
              </div>
              <div className="justify-content-center col-12">
                <Form
                  handleSubmit={this.handleSubmit}
                  onChange={this.onChange}
                  onFocused={this.onFocused}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ signUp }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
