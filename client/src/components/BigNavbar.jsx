import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

// Action
import { signOut } from '../actions/authActions/index';

/**
 *
 *
 * @class Navbar
 * @extends {Component}
 */
class Navbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired
  }


  /**
   * Sign a user out of the app
   *
   * @returns {void}
   *
   * @param {object} event
   *
   * @memberOf Navbar
   */
  logOut = () => {
    this.props.signOut();
  }

  /**
   *
   *
   * @returns {JSX.Element } React element
   *
   * @memberOf Navbar
   */
  render() {
    return (
      <section className="container-fluid m-0 p-0">
        <nav
          data-aos="flip-up"
          className="navbar bg-transparent navbar-expand navbar-dark"
          style={{ zIndex: 1000, height: '200px' }}
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
                {this.props.auth.isLoggedIn ? (
                  <li className="nav-item mt-5 pr-15 ml-3">
                    <Link
                      id="greetings"
                      className=" text-orange"
                      to={`/profile/${this.props.auth.authInfo.userId}`}
                    >
                  Hi {this.props.auth.authInfo.username},
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item mt-5 pr-15 ml-3">
                    <Link className=" text-orange" to="/" id="attempt_greetings">
                  Hi there,
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  {this.props.auth.isLoggedIn ? (
                    <span
                      onClick={this.logOut}
                      id="logout"
                      className="nav-link btn btn-outline-light btn-lg btn-sign hovered"
                    >
                  sign out
                    </span>
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
export const mapStateToProps = state => ({
  auth: state.user
});
export default connect(mapStateToProps, { signOut })(Navbar);
export { Navbar as BigNavbar };
