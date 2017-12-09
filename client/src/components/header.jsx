import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Navbar from './navbar';

class Header extends Component {
  render() {
    const headerImg = {
      background: `linear-gradient(90deg, rgba(241, 193, 89, 0.45), rgba(241, 193, 89, 0.5), rgba(241, 193, 89, 0.6), rgba(241, 193, 89, 0.7), rgba(241, 193, 89, 0.8), rgba(241, 193, 89, 0.9), rgba(241, 193, 89, 1)), 
      url('../img/Food.jpg') no-repeat center center`,
      backgroundSize: 'cover'
    };
    return (
      <section className="container-fluid ">
        <div className="header" style={headerImg}>
          <Navbar />
          <div className="row header-items justify-content-center">
            <div className="col-lg-6 col-sm-10 text-center">
              <img src="../img/logo.png" alt="logo" />
              <p className=" text-shadowed bolden mt-2">
                More Recipes provides a platform for you to share the awesome
                and exciting recipe ideas you have invented or learnt. feel free
                to Browse through amazing recipes from around the world, or
                &nbsp;<Link
                  to="/signup"
                  className="btn btn-dark hvr-icon-buzz-out"
                  role="button"
                >
                  Sign Up&nbsp;
                </Link>&nbsp;to post yours.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Header;
