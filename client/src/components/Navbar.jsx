import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import * as actions from '../actions';
import Auth from './auth';

/**
 *
 *
 * @class Navbar
 * @extends {Component}
 */
class Navbar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      avatar: null
    }
  }
  /**
   *
   *
   * @memberof Navbar
   * @returns {any} user data
   */
  componentDidMount() {
    if (Auth.userID()) {
      this.props.getProfile(Auth.userID());
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      avatar: nextProps.user.data.avatar
    })
  }
  
  /**
   *
   *
   * @memberof Navbar
   * @returns {any} null token
   */
  logout() {
    Auth.logout();
  }

  /**
   *
   *
   * @returns {any} navigation bar
   * @memberof Navbar
   */
  navLinks() {
    if (Auth.loggedIn()) {
      return (
        <div>
          <h6 className="dropdown-header text-center">{this.props.user? `Signed in as ${this.props.user.data.moniker}`: `loading`}</h6>
          <div className="dropdown-divider"/>
          <Link
            className="dropdown-item bold"
            to={`/profile/${Auth.userID()}`}
          >
           Your profile
          </Link>
          <Link
            className="dropdown-item bold"
            to="/favorites"
          >
           Your favorites
          </Link>
          <div className="dropdown-divider"/>
          <a className="dropdown-item bold" onClick={this.logout} href="/">
            {` `}
            Logout
          </a>
        </div>
      );
    } else {
      return (
        <h6>
          <Link className="dropdown-item bold mb-2" to="/signin">
            {` `}
            Sign in
          </Link>
          <Link className="dropdown-item bold" to="/signup">
            {` `}
            Sign up
          </Link>
        </h6>
      );
    }
  }
  /**
   *
   *
   * @returns {any} jsx
   * @memberof Navbar
   */
  render() {
    const { avatar } = this.state;
    return (
      <section className="container-fluid fixed">
        <nav
          className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark bg-navbar"
          style={{ zIndex: 1000 }}
        >
          <div className="container">
            <Link className="navbar-brand bolder text-orange" to="/">
              MoreRecipes
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
              <i className="fa fa-bars text-orange" aria-hidden="true" />
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
                        src={
                          avatar || 'http://res.cloudinary.com/emasys/image/upload/v1512284211/wgeiqliwzgzpcmyl0ypd.png'
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
                    className="dropdown-menu  dropdown-menu-right custom-dropdown"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    {this.navLinks()}
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
  user: state.signin.userProfile
});

export default connect(mapStateToProps, actions)(Navbar);
