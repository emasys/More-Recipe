import React from 'react';
import { Link } from 'react-router-dom';

// components
import Navbar from './Navbar';

const NotFound = () => (
  <div className="container">
    <Navbar />
    <div className="text-center error-message mt-80">
      <div className="catalog-wrapper">
        <img src="../img/logo.png" alt="logo" />
        <h2 className="p-3 m-20">
            We Know this is embarrassing,<br /> but don't worry we won't judge
            you
        </h2>
        <h2>
            ...Go back{' '}
          <Link
            to="/"
            className="btn btn-dark btn-lg hvr-icon-back"
            role="button"
          >
              &nbsp;Home
          </Link>{' '}
        </h2>
      </div>
    </div>
  </div>
);

export default NotFound;
