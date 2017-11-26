import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  logout() {
    localStorage.removeItem('token');
  }

  auth() {
    const login = window.localStorage.getItem('token');
    console.log('reached', login);
    try {
      if (login) {
        const decoded = jwt_decode(login);

        return (
          <h6>
            <Link className="dropdown-item" to={`/profile/${decoded.id}`}>
              <i className="fa fa-user-circle" aria-hidden="true" />
              {` `}
              Profile
            </Link>
            <Link className="dropdown-item" onClick={this.logout} to="/">
              <i className="fa fa-sign-out" aria-hidden="true" />
              {` `}
              Logout
            </Link>
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
    } catch (error) {
      // console.log(error);
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
            <Link className="navbar-brand text-white" to="/">
              {/* <img src="/img/favicon.fw.png" alt="favicon" /> */}
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
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                <li className="nav-item ">
                  <NavLink
                    className="nav-link text-light"
                    activeClassName="active"
                    to="/catalog"
                  >
                    <i className="material-icons fa-2x" aria-hidden="true">
                      &#xE8EF;
                    </i>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    activeClassName="active"
                    to="/favorites"
                  >
                    <i className="material-icons fa-2x red">&#xE87D;</i>
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
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
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    {this.auth()}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    );
  }
}

export default Navbar;
