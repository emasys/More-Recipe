import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';

import countryList from '../../components/CountryList';
/**
 *
 *
 * @param {object} props
 * @returns {JSX.Element} react element
 */
const UserEditForm = props => {
  const {
    state: {
      firstName, lastName, bio, display
    },
    onFocus,
    onBlur,
    goBack,
    editProfile
  } = props;
  return (
    <form onSubmit={editProfile}>
      <ul className="form row">
        <h2 className="fresh-title text-center col-12">Edit profile </h2>
        <li className="col-lg-6 col-sm-12">
          <label>First Name</label>
          <input
            type="text"
            required
            placeholder="alphabet only"
            className="col-lg-11 col-sm-12"
            name="firstName"
            onFocus={onFocus}
            onBlur={onBlur}
            defaultValue={firstName}
          />
          <div className={`text-danger ${display}`} id="firstname_error" />
        </li>
        <li className="col-lg-6 col-sm-12">
          <label>Last Name</label>
          <input
            type="text"
            required
            placeholder="alphabet only"
            className="col-lg-11 col-sm-12"
            name="lastName"
            onFocus={onFocus}
            onBlur={onBlur}
            defaultValue={lastName}
          />
          <div className={`text-danger ${display}`} id="lastname_error" />
        </li>
        <li className="col-lg-6 col-sm-12">
          <label>Bio</label>
          <Textarea
            className="col-lg-11 col-sm-12"
            id="bio"
            name="bio"
            defaultValue={bio}
            minRows={1}
            maxRows={50}
            maxLength={400}
          />
        </li>
        <li className="special col-lg-6 p-3">
          <label>Country</label>
          <select
            id="country"
            name="country"
            className="col-12 "
            style={{ height: '50px' }}
          >
            {countryList.map(country => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </li>
        <li className=" col-12 ">
          <input
            type="submit"
            value="save"
            id="submit"
            className="btn bg-success hovered"
          />
        </li>
        <li className=" col-12 ">
          <button
            onClick={goBack}
            id="goBack"
            className="btn btn-block btn-lg col-12 bg-warning hovered"
          >
            Back
          </button>
        </li>
      </ul>
    </form>
  );
};

UserEditForm.propTypes = {
  state: PropTypes.object.isRequired,
  editProfile: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired
};
export default UserEditForm;
