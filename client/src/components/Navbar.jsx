import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

// actions
import { getProfile } from '../actions/userActions';
import { signOut } from '../actions/authActions/index';

// components
import Navlinks from './Navlinks';
import config from '../config';

/**
 *
 *
 * @class Navbar
 * @extends {Component}
 */
export class Navbar extends Component {
  static propTypes = {
    user: PropTypes.object,
    getProfile: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
  };

  static defaultProps = {
    user: null
  }
  /**
   * Creates an instance of Navbar.
   * @param {object} props
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
   *
   * @returns {object}
   * invoked immediately after a component is mounted
   */
  componentDidMount = () => {
    if (this.props.auth.isLoggedIn && !this.props.user) {
      this.props.getProfile(this.props.auth.authInfo.userId);
    } else if (this.props.auth.isLoggedIn && this.props.user) {
      this.setState({
        avatar: this.props.user.data.avatar
      });
    }
  };
  /**
   *
   * invoked before a mounted component receives new props.
   * @param {object} nextProps
   * @memberof Navbar
   * @returns {void}
   */
  componentWillReceiveProps = nextProps => {
    if (nextProps.user) {
      this.setState({
        avatar: nextProps.user.data.avatar
      });
    }
  };
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
   * @returns {JSX.Element}
   * render react element into the DOM
   * @memberof Navbar
   */
  render() {
    return (
      <section className="container-fluid m-0 p-0">
        <nav
          data-aos="flip-up"
          className={`navbar navbar-expand-lg navbar-dark ${
            this.props.className
          }`}
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
              <ul className="navbar-nav">
                <li>
                  <NavLink
                    className="nav-link "
                    activeClassName="active"
                    to="/catalog"
                    data-tip="Search for recipes"
                  >
                    <i className="material-icons fa-2x d-none d-lg-inline">
                      &#xE8B6;
                    </i>
                    <span className="d-lg-none pl-3">Search</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/catalog"
                    data-tip="Catalog"
                  >
                    <i
                      className="material-icons fa-2x  d-none d-lg-inline"
                      aria-hidden="true"
                    >
                      &#xE8EF;
                    </i>
                    <span className="d-lg-none pl-3">Catalog</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    activeClassName="active"
                    to="/favorites"
                    data-tip="Your favorites"
                    id="favorite"
                  >
                    <i className="material-icons fa-2x red d-none d-lg-inline">
                      &#xE87D;
                    </i>
                    <span className="d-lg-none pl-3">Favorites</span>
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  {this.props.auth.isLoggedIn ? (
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img
                        src={
                          this.state.avatar || config.DEFAULT_DISPLAY_PICTURE
                        }
                        alt="avi"
                        className="fa-2x img-icon rounded-circle"
                      />
                    </a>
                  ) : (
                    <a
                      className="nav-link "
                      href="#"
                      id="navbarDropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="material-icons fa-2x">&#xE853;</i>
                    </a>
                  )}

                  <div
                    className="dropdown-menu dropdown-menu-right custom-dropdown"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <Navlinks user={this.props.auth} logOut={this.logOut} />
                  </div>
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
  auth: state.user,
  user: state.user.userProfile
});

export default connect(mapStateToProps, { getProfile, signOut })(Navbar);
