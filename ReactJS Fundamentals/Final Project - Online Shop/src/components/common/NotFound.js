import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../style/css/notFound.css';

class NotFount extends Component {
  render () {
    return (<div className='notFound-container'>
      <h3>Error 404 Page not found</h3>
      <Link to='/home'><button className='btn-back'>Go to home page</button></Link>
    </div>);
  }
}

export default NotFount;
