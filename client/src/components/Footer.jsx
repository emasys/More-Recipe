import React from 'react';

const Footer = () => (
  <div>
    <footer className="container-fluid bg-dark footer-main">
      <div className="container ">
        <div className="row">
          <div className="col-12 footer-social text-center mt-20">
            <a href="https://web.facebook.com/emasys23" target="_blank">
              <i className="fa fa-facebook-square fa-2x" aria-hidden="true" />
            </a>&nbsp;
            <a href="https://twitter.com/emasys_nd" target="_blank">
              <i className="fa fa-twitter-square fa-2x" aria-hidden="true" />
            </a>&nbsp;
            <a href="https://github.com/emasys" target="_blank">
              <i className="fa fa-github-square fa-2x" aria-hidden="true" />
            </a>
            <p className="text-center text-white">
              &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
