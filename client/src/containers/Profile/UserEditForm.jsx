import React from 'react';
import PropTypes from 'prop-types';
import countryList from '../../components/CountryList';

const focus = () => {
  document.querySelector('.text-danger').innerHTML = '';
};
/**
 *
 *
 * @param {object} props
 * @returns {JSX.Element} react element
 */
const UserEditForm = props => {
  const { firstName, lastName, bio } = props.state;
  return (
    <form onSubmit={props.editProfile}>
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
            onFocus={focus}
            defaultValue={firstName}
          />
          <div className="text-danger" id="firstname_error" />
        </li>
        <li className="col-lg-6 col-sm-12">
          <label>Last Name</label>
          <input
            type="text"
            required
            placeholder="alphabet only"
            className="col-lg-11 col-sm-12"
            name="lastName"
            onFocus={focus}
            defaultValue={lastName}
          />
          <div className="text-danger" id="lastname_error" />
        </li>
        <li className="col-lg-6 col-sm-12">
          <label>Bio</label>
          <textarea
            className="col-lg-11 col-sm-12"
            id="FormControlTextarea"
            name="bio"
            defaultValue={bio}
            rows="4"
          />
        </li>
        <li className="special col-lg-6 p-3">
          <label>Country</label>
          <select name="country" className="col-12 " style={{ height: '50px' }}>
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
            className="btn bg-dark hovered"
          />
        </li>
      </ul>
    </form>
  );
};

UserEditForm.propTypes = {
  state: PropTypes.object.isRequired,
  editProfile: PropTypes.func.isRequired
};
export default UserEditForm;
