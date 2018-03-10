import React from 'react';


const Footer = () => (
  <div>
    <footer className="container-fluid footer-main bg-dark">
      <div className="container ">
        <div className="row ">
          <div className="col-12 footer-social text-center mt-20">
            <a href="https://web.facebook.com/emasys23" rel="noopener noreferrer" target="_blank">
              <i className="fa fa-facebook-square text-white fa-2x" aria-hidden="true" />
            </a>&nbsp;
            <a href="https://twitter.com/emasys_nd" rel="noopener noreferrer" target="_blank">
              <i className="fa fa-twitter-square text-white fa-2x" aria-hidden="true" />
            </a>&nbsp;
            <a href="https://github.com/emasys" rel="noopener noreferrer" target="_blank">
              <i className="fa fa-github-square text-white fa-2x" aria-hidden="true" />
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
