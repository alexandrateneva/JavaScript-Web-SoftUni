import React, { Component } from 'react';
import Navigation from '../common/Navigation';

class Header extends Component {
  render () {
    return (
      <header>
        <Navigation username={this.props.username} />
        <h1>Zoo Shop</h1>
      </header>
    );
  }
}

export default Header;
