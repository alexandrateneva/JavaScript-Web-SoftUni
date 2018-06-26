import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

let counter = 0;

const incrementCounter = () => {
  counter++;
  ReactDOM.render(App(), document.getElementById('root'));
}

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React Counter</h1>
    </header>
    <h3>Counter: {counter}</h3>
    <button onClick={incrementCounter}>Click</button>
  </div>
);

export default App;
