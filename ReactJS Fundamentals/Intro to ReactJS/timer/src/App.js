import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React Timer</h1>
    </header>
    <h3>It is {new Date(Date.now()).toLocaleTimeString('en-US')}.</h3>
  </div>
);

export default App;
