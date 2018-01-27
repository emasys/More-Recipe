import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

// actions
import * as actions from '../actions';

// components
import Auth from './auth';

/**
 *
 *
 * @class Navbar
 * @extends {Component}
 */
export class Navbar extends Component {
  /**
   * Creates an instance of Navbar.
   * @param {any} props
   * @memberof Navbar
   */
  constructor(props) {
    super(props);

    this.state = {
      avatar: null
    };
  }
  /**
   *
   *
   * @memberof Navbar
   * @returns {any}
   * invoked immediately after a component is mounted
   */
  componentDidMount() {
    if (Auth.userID()) {
      this.props.getProfile(Auth.userID());
    }
  }
  /**
   *
   * @returns {any}
   * invoked before a mounted component receives new props.
   * If you need to update the state in response to prop changes
   * (for example, to reset it), you may compare this.props and
   * nextProps and perform state transitions using this.setState()
   * in this method.
   * @param {any} nextProps
   * @memberof Navbar
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user.data.firstName
    });
  }

  logout = () => {
    Auth.logout();
  };
  /**
   *
   *
   * @returns {any}
   * render react element into the DOM
   * @memberof Navbar
   */
  render() {
    const { user } = this.state;
    return (
      <section className="container-fluid m-0 p-0">
        <nav
          data-aos="flip-up"
          className={`navbar navbar-expand-lg navbar-dark ${
            this.props.className
          }`}
          style={{ zIndex: 1000 }}
        >
          <div className="container">
            <Link className="navbar-brand bolder ml-3 text-orange" to="/">
              <span className="nb">More Recipes</span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fa fa-bars fa-2x text-orange" aria-hidden="true" />
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav bold">
                {Auth.loggedIn() ? (
                  <li className="nav-item mt-5 pr-15 ml-3">
                    <Link
                      className=" text-orange"
                      to={`/profile/${Auth.userID()}`}
                    >
                      Hey {user},
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item mt-5 pr-15 ml-3">
                    <Link className=" text-orange" to="/">
                      Hey there,
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  {Auth.loggedIn() ? (
                    <a
                      onClick={this.logout}
                      className="nav-link btn btn-outline-light btn-lg btn-sign "
                      href="/"
                    >
                      sign out
                    </a>
                  ) : (
                    <Link
                      className="nav-link btn btn-outline-light btn-lg btn-sign"
                      to="/signin"
                    >
                      sign in
                    </Link>
                  )}
                </li>
              </ul>
              <ReactTooltip place="bottom" type="dark" effect="float" />
            </div>
          </div>
        </nav>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.userProfile
});

Navbar.propTypes = {
  user: PropTypes.object,
  getProfile: PropTypes.func,
  className: PropTypes.string
};
export default connect(mapStateToProps, actions)(Navbar);
