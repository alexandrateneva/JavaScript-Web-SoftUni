import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import ContactList from './contacts.json';

let contactIndex = 0;

const makeContact = (data, currentIndex) => (
  <div className="contact" key={data.email} data-id="id" onClick={e => selectDetailsContact(currentIndex)}>
    <span className="avatar small">&#9787;</span>
    <span className="title">{data.firstName} {data.lastName}</span>
  </div>
);

const contactDetails = data => (
  <div className="content">
    <div className="info">
      <div className="col">
        <span className="avatar">&#9787;</span>
      </div>
      <div className="col">
        <span className="name">{data.firstName}</span>
        <span className="name">{data.lastName}</span>
      </div>
    </div>
    <div className="info">
      <span className="info-line">&#9742; {data.phone}</span>
      <span className="info-line">&#9993; {data.email}</span>
    </div>
  </div>
);

const selectDetailsContact = index => {
  console.log(index);
  contactIndex = index;
  ReactDOM.render(App(), document.getElementById('root'));
};

const App = () =>
  (<div className="container">
    <header>&#9993; Contact Book</header>
    <div id="book">
      <div className="content">

        <div id="list">
          <h1>Contacts</h1>
          <div className="content">
            {ContactList.map((contact, index) => makeContact(contact, index))}
          </div>
        </div>

        <div id="details">
          <h1>Details</h1>
          {contactDetails(ContactList[contactIndex])}
        </div>

      </div>
    </div>
    <footer>Contact Book SPA &copy; 2017</footer>
  </div >);

export default App;
