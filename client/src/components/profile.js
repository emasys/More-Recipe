import React, { Component } from 'react';

class Profile extends Component {
  render() {
    const token = window.localStorage.getItem('token');
    return (
      <div>
        <h1>profie</h1>
        {token}
      </div>
    );
  }
}

export default Profile;
