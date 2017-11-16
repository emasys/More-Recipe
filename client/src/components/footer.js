import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="container-fluid bg-dark">
          <div className="container ">
            <div className="row">
              <div className="col-12 footer-items ">
                <p className="text-center text-white">
                  &copy;2017 All rights reserved
                </p>
              </div>
              <div className="col-12 footer-social text-center">
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
