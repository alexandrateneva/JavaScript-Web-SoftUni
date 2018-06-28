import React, { Component } from 'react';
import './App.css';

import SingUpForm from './components/form/SingUpForm';
import LoginForm from './components/form/LoginForm';
import PokemonContainer from './components/PokemonContainer';

class App extends Component {
  constructor () {
    super();

    this.state = {
      username: '',
      token: ''
    };

    this.authenticate = (data) => {
      if (data.success) {
        this.setState({ token: data.token, username: data.user.name });
        localStorage.setItem('token', data.token);
      }
    };

    this.logout = () => {
      this.setState({ token: '', username: '' });
      localStorage.clear();
    };
  }

  componentDidMount () {
    this.setState({ token: localStorage.getItem('token') });
  }

  render () {
    if (this.state.token !== '' && this.state.token !== 'undefined' && typeof (localStorage.token) !== 'undefined') {
      return <div>
        <div className='nav'>
          <h1 className='title'>Welcome to our Pokemon Web Site</h1>
          <button className='logoutBtn' onClick={this.logout}>Logout</button>
        </div>
        <PokemonContainer />
      </div>;
    }

    return (
      <div>
        <SingUpForm />
        <LoginForm authFunc={this.authenticate} />
      </div>
    );
  }
}

export default App;
