import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

// actions
import * as actions from '../actions';

// components
import Auth from './auth';
import Navlinks from './Navlinks';
import config from '../config';

/**
 *
 *
 * @class Navbar
 * @extends {Component}
 */
class Navbar extends Component {
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
      avatar: nextProps.user.data.avatar
    });
  }

  /**
   *
   *
   * @returns {any}
   * render react element into the DOM
   * @memberof Navbar
   */
  render() {
    const { avatar } = this.state;
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
              <ul className="navbar-nav">
                <li>
                  <NavLink
                    className="nav-link "
                    activeClassName="active"
                    to="/catalog"
                    data-tip="Search for recipes"
                  >
                    <i className="material-icons fa-2x d-sm-none d-lg-inline">
                      &#xE8B6;
                    </i>
                    <span
                      className="d-lg-none"
                      style={{ verticalAlign: 'top' }}
                    >
                      Search
                    </span>
                  </NavLink>
                </li>
                {Auth.loggedIn() ? (
                  <li className="nav-item ">
                    <NavLink
                      className="nav-link"
                      activeClassName="active"
                      to="/new"
                      data-tip="Add new recipe"
                    >
                      <i
                        className="material-icons fa-2x d-sm-none d-lg-inline"
                        aria-hidden="true"
                      >
                        add_to_photos
                      </i>
                      <span
                        className="d-lg-none"
                        style={{ verticalAlign: 'top' }}
                      >
                        Add new recipe
                      </span>
                    </NavLink>
                  </li>
                ) : (
                  ''
                )}
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/catalog"
                    data-tip="Catalog"
                  >
                    <i
                      className="material-icons fa-2x  d-sm-none d-lg-inline"
                      aria-hidden="true"
                    >
                      &#xE8EF;
                    </i>
                    <span
                      className="d-lg-none"
                      style={{ verticalAlign: 'top' }}
                    >
                      Catalog
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    activeClassName="active"
                    to="/favorites"
                    data-tip="Your favorites"
                  >
                    <i className="material-icons fa-2x red d-sm-none d-lg-inline">
                      &#xE87D;
                    </i>
                    <span
                      className="d-lg-none"
                      style={{ verticalAlign: 'top' }}
                    >
                      Favorites
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  {Auth.loggedIn() ? (
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img
                        src={avatar || config.DEFAULT_DISPLAY_PICTURE}
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
                    <Navlinks user={this.props.user} />
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
  user: state.user.userProfile
});

Navbar.propTypes = {
  user: PropTypes.object,
  getProfile: PropTypes.func,
  className: PropTypes.string
};
export default connect(mapStateToProps, actions)(Navbar);
