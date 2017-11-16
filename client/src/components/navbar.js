import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <section className="container-fluid fixed">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-dark bg-navbar">
          <div className="container">
            <Link className="navbar-brand text-white" to="/">
              More Recipes
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
            {/* <form className=" col-lg-9 col-md-12 col-sm-12 text-center p-0 m-0">
              <input type="search" name="search" placeholder="search..." />
            </form> */}
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
                    <i class="fa fa-archive fa-2x " aria-hidden="true" />
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    activeClassName="active"
                    to="/favorites"
                  >
                    <i className="fa fa-heart fa-2x red" aria-hidden="true" />
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
                    <i className="fa fa-user-circle fa-2x" aria-hidden="true" />
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                    <Link className="dropdown-item" to="/signin">
                      Sign in
                    </Link>
                    <Link className="dropdown-item" to="/signup">
                      Sign up
                    </Link>
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
