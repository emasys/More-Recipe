import React from 'react';
import { Link } from 'react-router-dom';

// components
import Navbar from './Navbar';

const NotFound = () => (
  <div className="container">
    <Navbar className="bg-dark fixed-top"/>
    <div className=" row catalog-wrapper text-center justify-content-center  mt-80 mb-20">
      <div className="col">
        <img src="https://res.cloudinary.com/emasys/image/upload/v1516439649/mR_2_jwnuce.png" alt="logo" />
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
