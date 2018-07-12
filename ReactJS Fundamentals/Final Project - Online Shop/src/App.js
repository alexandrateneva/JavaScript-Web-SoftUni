import React, { Component } from 'react';
import './App.css';
import observer from './utils/observer';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Notification from './components/common/Notification';
import ViewComponent from './components/common/ViewComponent';

const classNames = [
  "first-header",
  "second-header",
  "third-header"
];

class App extends Component {
  constructor() {
    super();

    this.state = {
      username: localStorage.getItem('username'),
      index: 0
    }

    observer.subscribe(observer.events.loginUser, this.userLoggedIn)
    observer.subscribe(observer.events.logoutUser, this.userLogout)
  }

  incrementIndex = () => {
    const newIndex = this.state.index + 1;
    this.setState({ index: newIndex })
  }

  componentDidMount = () => {
    setInterval(this.incrementIndex, 3000);
  }

  userLoggedIn = username => this.setState({ username });
  userLogout = data => this.setState({ username: data });

  render() {
    const index = this.state.index % classNames.length;
    const className = classNames[index];
    return (
      <div>
      <div className={className}>
        <Header username={this.state.username}/>        
        <Notification />
      </div>
      <div className="content">   
      <ViewComponent />
      </div>
      <Footer />
    </div>
    );
  }
}

export default App;
