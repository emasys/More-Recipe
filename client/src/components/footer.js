import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="container-fluid bg-dark footer-main">
          <div className="container ">
            <div className="row">
              {/* <div className="col-lg-4 col-sm-12 footer-items ">
                <ul className="nav flex-column footer-link">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Catalog
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Favorites
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 col-sm-12 footer-items ">
                <ul className="nav flex-column footer-link">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      About More-Recipes
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Contact Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div> */}
              <div className="col-12 footer-social text-center mt-100">
                <p className="text-center text-white">
                  &copy;2017 All rights reserved
                </p>
                <a href="#">
                  <i
                    className="fa fa-facebook-square fa-2x"
                    aria-hidden="true"
                  />
                </a>&nbsp;
                <a href="#">
                  <i
                    className="fa fa-twitter-square fa-2x"
                    aria-hidden="true"
                  />
                </a>&nbsp;
                <a href="#">
                  <i className="fa fa-instagram fa-2x" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
