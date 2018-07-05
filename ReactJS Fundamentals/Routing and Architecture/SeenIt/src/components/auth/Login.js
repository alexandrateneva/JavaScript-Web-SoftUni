import React, { Component } from 'react';
import dataCollector from './../../utils/dataCollector';
import reqHandler from './../../utils/reqHandler';
import observer from '../../utils/observer';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  dataCollector = (e) => {
    this.setState(dataCollector(e));
  }

  login = (e) => {
    e.preventDefault();
    if (this.state.username === '' || this.state.password === '') {
      observer.trigger(observer.events.notification, {
        type: 'error',
        message: 'Please, fill in the username and password.'
      });
      return;
    }
    reqHandler.login(this.state).then(res => {
      if (res.error) {
        observer.trigger(observer.events.notification, {
          type: 'error',
          message: 'Invalid credentials! Please, try again!'
        });
        return;
      }

      localStorage.setItem('token', res._kmd.authtoken);
      localStorage.setItem('username', res.username);
      observer.trigger(observer.events.loginUser, res.username);
      observer.trigger(observer.events.notification, {
        type: 'success',
        message: 'Login successful!'
      });
    });
  }

  render() {
    return (
      <form id='loginForm' onSubmit={this.login.bind(this)}>
        <h2>Sign In</h2>
        <label>Username:</label>
        <input name='username' type='text' onChange={this.dataCollector.bind(this)} />
        <label>Password:</label>
        <input name='password' type='password' onChange={this.dataCollector.bind(this)} />
        <input id='btnLogin' value='Sign In' type='submit' />
      </form>
    )
  }
}

export default Login;
