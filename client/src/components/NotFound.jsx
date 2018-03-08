import React from 'react';
import { Link } from 'react-router-dom';

// components
import Navbar from './Navbar';

const NotFound = () => (
  <div className="container">
    <Navbar className="bg-dark fixed-top" />
    <div className=" row catalog-wrapper text-center justify-content-center  mt-80 mb-20">
      <div className="col">
        <img
          src="https://res.cloudinary.com/emasys/image/upload/v1516439649/mR_2_jwnuce.png"
          alt="logo"
          className="col-12 not-found-logo"
        />
        <h2 className="p-3 m-20">Oops...</h2>
        <h2 className="p-3 m-20">
          The content you are looking for does not exist
        </h2>
        <h2>
          <Link
            to="/"
            className="btn btn-dark btn-lg hvr-icon-back"
            role="button"
          >
            ...Go back Home
          </Link>
        </h2>
      </div>
    </div>
  </div>
);

export default NotFound;
