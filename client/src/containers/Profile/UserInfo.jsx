import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';

import config from '../../config';
import Auth from '../../components/auth';

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
      <div className="col-lg-2 col-md-4 col-sm-12 mb-10">
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
          {firstName &&
            lastName && (
              <h2 className="mb-10 bolder">
                {`${firstName} ${lastName} `}
                (<small className="header-title">{moniker}</small>)
              </h2>
            )}
          {!firstName && <h2 className="mb-10 bolder">{moniker}</h2>}
          <div>
            <p>{bio}</p>
            <hr />
          </div>
          <small>
            <i className="fa fa-envelope" aria-hidden="true" /> {email}
          </small>
          {country && (
            <p className=" text-capitalize">
              <small>
                <i className="fa fa-map-marker" aria-hidden="true" /> {country}
              </small>
            </p>
          )}
          <div>
            <button
              className={`btn btn-success btn-lg ${save}`}
              onClick={() => {
                props.handleImg();
                props.notify();
              }}
            >
              Upload Image
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
  return 'loading...';
};

UserInfo.propTypes = {
  showForm: PropTypes.func.isRequired,
  changeDp: PropTypes.func,
  data: PropTypes.object,
  state: PropTypes.object.isRequired,
  hoverIn: PropTypes.func.isRequired,
  hoverOut: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
  handleImg: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired
};

UserInfo.defaultProps = {
  changeDp: function () {},
  data: {
    data: {
      id: ''
    }
  }
};
export default UserInfo;
