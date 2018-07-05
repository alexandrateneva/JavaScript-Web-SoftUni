import React, { Component } from 'react';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Notification from './components/common/Notification';
import Menu from './components/common/Menu';
import GuestHome from './components/auth/GuestHome';
import Home from './components/auth/Home';
import observer from './utils/observer';

class App extends Component {
  constructor() {
    super();

    this.state = {
      username: localStorage.getItem('username')
    }

    observer.subscribe(observer.events.loginUser, this.userLoggedIn)
    observer.subscribe(observer.events.logoutUser, this.userLogout)
  }

    userLoggedIn = username => this.setState({username});
    userLogout = data => this.setState({username: data});

    render () {
      return (
        <div>
          <Header username={this.state.username}/>
          <Notification />
          {(this.state.username !== null) ? <Home /> : <GuestHome />} 
          <Footer />
        </div>
      );
    }
  }

  export default App;
