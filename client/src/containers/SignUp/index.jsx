import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Validator helper
import errorMessages, {
  validateEmail,
  validatePassword,
  validateMoniker,
  confirmPassword
} from '../validator/index';

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
 */
export class SignUp extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    signUp: PropTypes.func.isRequired
  };

  /**
   * Creates an instance of SignUp.
   * @param {any} props
   *
   * @memberOf SignUp
   */
  constructor(props) {
    super(props);

    this.state = {
      display: 'd-none',
      emailError: 'd-none',
      monikerError: 'd-none'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFocused = this.onFocused.bind(this);
    this.showError = this.showError.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  /**
   * @returns {void}
   *
   *
   * @memberOf SignUp
   */
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  /**
   * @param {object} nextProps
   *
   * @returns {void}
   *
   * @memberOf SignUp
   */
  componentWillReceiveProps = nextProps => {
    if (nextProps.user.signUp) {
      if (nextProps.user.signUp.success) {
        nextProps.history.push('/');
      }
      if (nextProps.user.signUp.error) {
        switch (nextProps.user.signUp.error[0].path) {
        case 'email':
          this.setState({ emailError: 'd-block' });
          this.setState({ monikerError: 'd-none' });
          break;
        case 'moniker':
          this.setState({ monikerError: 'd-block' });
          this.setState({ emailError: 'd-none' });
          break;
        }
      }
    }
  };

  /**
   * clear input field
   *
   * @param {string} inputName
   *
   * @returns {void}
   * @memberOf SignUp
   */
  onFocused(inputName) {
    this.setState({ display: 'd-none' });
    this.setState({ [inputName]: 'd-none' });
  }

  /**
   * Toggle error message display status
   *
   * @returns {void}
   *
   * @memberOf SignUp
   */
  showError() {
    this.setState({ display: 'd-block' });
  }

  /**
   * Validate field on value change
   *
   * @param {object} event
   *
   * @returns {void}
   * @memberOf SignUp
   */
  onChange(event) {
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
  }
  /**
   * Submit form
   *
   * @param {object} event
   *
   * @memberof SignUp
   * @returns {void}
   */
  handleSubmit(event) {
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
  }
  /**
   *
   *
   * @returns {JSX.Element} React element
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
                  showError={this.showError}
                  state={this.state}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { signUp })(SignUp);
