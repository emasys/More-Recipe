import React, { Component } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="text-center error-message mt-80">
          <div className="catalog-wrapper">
            <img src="../img/logo.png" alt="logo" />
            <h2 className="p-3 m-20">
              We Know this is embarrassing,<br /> but don't worry we won't judge you
            </h2>
            <h2>
              ...Go back{' '}
              <Link to="/" className="btn btn-dark hvr-icon-forward" role="button">
                Home&nbsp;
              </Link>{' '}
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
