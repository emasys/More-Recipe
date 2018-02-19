import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

// components
import Auth from './auth';

const logout = () => {
  Auth.logout();
};

console.log("is logged in", Auth.loggedIn());

/**
 *
 *
 * @class Navbar
 * @extends {Component}
 */
const Navbar = () => (
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
            {Auth.loggedIn() ? (
              <li className="nav-item mt-5 pr-15 ml-3">
                <Link className=" text-orange" to={`/profile/${Auth.userID()}`}>
                  Hi {Auth.moniker()},
                </Link>
              </li>
            ) : (
              <li className="nav-item mt-5 pr-15 ml-3">
                <Link className=" text-orange" to="/">
                  Hi there,
                </Link>
              </li>
            )}
            <li className="nav-item">
              {Auth.loggedIn() ? (
                <a
                  onClick={logout}
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

export default Navbar;
