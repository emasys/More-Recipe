import React from 'react';
import PropTypes from 'prop-types';

// Config
import config from '../../config';

const UserProfileInfo = props => {
  if (props.data) {
    const {
      firstName,
      lastName,
      bio,
      email,
      avatar,
      country,
      moniker
    } = props.data.data;
    return (
      <div className="col-lg-2 col-md-4 col-sm-12 mb-10">
        <img
          src={avatar || config.DEFAULT_DISPLAY_PICTURE}
          alt="avi"
          className="img-fluid rounded mb-3"
        />
        <div className="bg-light rounded p-10 profile-wrapper">
          {firstName && (
            <h2 className="mb-10 bolder">
              {`${firstName} ${lastName} `}
              (<small className="header-title">{moniker}</small>)
            </h2>
          )}
          {!firstName && <h2 className="mb-10 bolder">{moniker}</h2>}
          <p>{bio}</p>
          <hr />
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
        </div>
      </div>
    );
  }
  return 'loading...';
};

UserProfileInfo.propTypes = {
  data: PropTypes.object.isRequired
};
export default UserProfileInfo;