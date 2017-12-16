import React from 'react';

const Footer = () => (
  <div>
    <footer className="container-fluid bg-dark footer-main">
      <div className="container ">
        <div className="row">
          <div className="col-12 footer-social text-center mt-100">
            <p className="text-center text-white">
                &copy;2017 All rights reserved
            </p>
            <a href="https://web.facebook.com/emasys23">
              <i className="fa fa-facebook-square fa-2x" aria-hidden="true" />
            </a>&nbsp;
            <a href="https://twitter.com/emasys_nd">
              <i className="fa fa-twitter-square fa-2x" aria-hidden="true" />
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

export default Footer;
