import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';

import config from '../../config';
import Auth from '../auth';


const UserInfo = props => {
  if (props.data) {
    const {
      firstName,
      lastName,
      bio,
      email,
      avatar,
      moniker,
      country
    } = props.data.data;

    const { status, preview, save } = props.state;
    return (
      <div className="col-lg-4 col-md-4 col-sm-12 mr-5 mb-10">
        <div
          className="img-wrapper"
          onMouseEnter={props.hoverIn}
          onMouseLeave={props.hoverOut}
        >
          <div
            className={` changeDp hovered  ${status}`}
            onClick={props.changeDp}
          >
            <Dropzone
              onDrop={props.handleDrop}
              accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png"
              multiple={false}
              className=" p-10 text-center text-light dropzone-dp"
            >
              click to change profile picture
            </Dropzone>
          </div>
          <img
            src={preview || avatar || config.DEFAULT_DISPLAY_PICTURE}
            alt="avi"
            className="img-fluid rounded mb-3"
          />
        </div>
        <div className="bg-light rounded p-10 profile-wrapper">
          <h2 className="mb-10 bolder">
            {`${firstName} ${lastName} `}
            (<small className="header-title">{moniker}</small>)
          </h2>
          <div>
            <p>{bio}</p>
            <hr />
          </div>
          <p>
            <i className="fa fa-envelope" aria-hidden="true" /> {email}
          </p>
          <p className=" text-capitalize">
            <i className="fa fa-map-marker" aria-hidden="true" /> {country}
          </p>
          <div>
            <button
              className={`btn btn-dark btn-lg ${save}`}
              onClick={() => {
                props.handleImg();
                props.notify();
              }}
            >
              save update
            </button>
          </div>
          <div className="mt-5">
            {Auth.moniker() === 'admin' ? (
              <Link to="/manageUsers" className="btn btn-lg btn-light">
                {' '}
                Manage Users
              </Link>
            ) : (
              ''
            )}
          </div>
          <div className="mt-5">
            <button className="btn btn-dark" onClick={props.showForm}>
              Edit profile
            </button>
          </div>
        </div>
      </div>
    );
  }
  return "loading...";
};

export default UserInfo;
