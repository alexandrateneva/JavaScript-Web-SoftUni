import React, { Component } from 'react';
import logout from '../auth/Logout';

class Header extends Component {
  render () {
    const loggedInSection = <div id='profile'><i>Welcome, {this.props.username}!</i> <button id='btnLogout' onClick={logout}>logout</button></div>;

    return (
      <header>
        <span className='logo'>☃</span><span className='header'>SeenIt</span>
        {(this.props.username !== null) ? loggedInSection : null}
      </header>
    );
  }
}

export default Header;
