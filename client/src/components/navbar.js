import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getProfile } from '../actions';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Auth from './Auth.js';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (Auth.userID()) {
      this.props.getProfile(Auth.userID());
    }
  }

  logout() {
    Auth.logout();
  }

  navLinks() {
    if (Auth.loggedIn()) {
      return (
        <h6>
          <Link className="dropdown-item" to={`/profile/${Auth.userID()}`}>
            <i className="fa fa-user-circle" aria-hidden="true" />
            {` `}
            Profile
          </Link>
          <a className="dropdown-item" onClick={this.logout} href="/">
            <i className="fa fa-sign-out" aria-hidden="true" />
            {` `}
            Logout
          </a>
        </h6>
      );
    } else {
      return (
        <h6>
          <Link className="dropdown-item" to="/signin">
            <i className="fa fa-sign-in" aria-hidden="true" />
            {` `}
            Sign in
          </Link>
          <Link className="dropdown-item" to="/signup">
            <i className="fa fa-user-plus" aria-hidden="true" />
            {` `}
            Sign up
          </Link>
        </h6>
      );
    }
  }
  render() {
    return (
      <section className="container-fluid fixed">
        <nav
          className="navbar navbar-expand-lg navbar-light fixed-top bg-dark bg-navbar"
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
                {Auth.loggedIn() ? (
                  <li className="nav-item ">
                    <NavLink
                      className="nav-link text-light"
                      activeClassName="active"
                      to="/new"
                      data-tip="Add new recipe"
                    >
                      <i className="material-icons fa-2x d-sm-none d-lg-inline" aria-hidden="true">
                        add_to_photos
                      </i>
                      <span className="d-lg-none">Add new recipe</span>
                    </NavLink>
                  </li>
                ) : (
                  ''
                )}
                <li className="nav-item ">
                  <NavLink
                    className="nav-link text-light"
                    activeClassName="active"
                    to="/catalog"
                    data-tip="Catalog"
                  >
                    <i className="material-icons fa-2x  d-sm-none d-lg-inline" aria-hidden="true">
                      &#xE8EF;
                    </i>
                    <span className="d-lg-none">Catalog</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    activeClassName="active"
                    to="/favorites"
                    data-tip="Your favorites"
                  >
                    <i className="material-icons fa-2x red d-sm-none d-lg-inline">&#xE87D;</i>
                    <span className="d-lg-none text-white">Favorites</span>
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  {Auth.loggedIn() ? (
                    <a
                      className="nav-link "
                      href="#"
                      id="navbarDropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img
                        src={
                          this.props.user
                            ? this.props.user.data.avatar.length > 10
                              ? this.props.user.data.avatar
                              : 'icon.svg'
                            : 'icon.svg'
                        }
                        alt="avatar"
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

                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
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

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getProfile }, dispatch),
});

const mapStateToProps = state => {
  return {
    user: state.signin.userProfile,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
