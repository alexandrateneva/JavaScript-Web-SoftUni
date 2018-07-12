import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'react-materialize';
import logout from '../auth/Logout';
import '../../style/css/navbar.css';

class Navigation extends Component {
  render () {
    const welcomeSection = <div className='auth'>
      <li><i style={{color: 'white'}}>Welcome, {this.props.username}!</i></li>
      <li><NavLink activeClassName='selected' className='nav-link' to='/profile'>Profile</NavLink></li>
      <li><NavLink activeClassName='selected' className='nav-link' onClick={logout} to='/home'>Logout</NavLink></li>
    </div>;

    const authSection = <div className='auth'>
      <li><NavLink activeClassName='selected' className='nav-link' to='/register'>Register</NavLink></li>
      <li><NavLink activeClassName='selected' className='nav-link' to='/login'>Login</NavLink></li>
    </div>;

    const adminSection = <div>
      <li><NavLink activeClassName='selected' className='nav-link' to='/addProduct'>Add Product</NavLink></li>
      <li><NavLink activeClassName='selected' className='nav-link' exact to='/addCategory'>Add Category</NavLink></li>
      <li><NavLink activeClassName='selected' className='nav-link' to='/orders'>Orders</NavLink></li>
    </div>;

    return (
      <nav className='navbar'>
        <div className='nav-links'>
          <ul>
            <li><NavLink activeClassName='selected' className='nav-link' exact to='/home'>Products</NavLink></li>
            <li><NavLink activeClassName='selected' className='nav-link' exact to='/categories'>Categories</NavLink></li>
            {(this.props.username === 'admin') ? adminSection : null}
          </ul>
        </div>
        <div className='shopping-cart'>
          {(this.props.username !== null && this.props.username !== 'guest') ? welcomeSection : authSection}
          <NavLink to='/cart'><Icon medium>shopping_cart</Icon></NavLink>
        </div>
      </nav>
    );
  }
}

export default Navigation;
