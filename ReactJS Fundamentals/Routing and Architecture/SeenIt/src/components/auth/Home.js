import React, { Component } from 'react';
import Menu from '../common/Menu';
import ViewComponent from '../common/ViewComponent';

class Home extends Component {
  render () {
    return (
      <div className='content'>
        <Menu />
        <ViewComponent />
      </div>
    );
  }
}

export default Home;
