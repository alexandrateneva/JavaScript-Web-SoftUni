import React, { Component } from 'react';
import validationFunc from './../../utils/formValidator';
import Input from './formFields/Input';

class LoginForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.baseState = this.state;
  }

  submitLogin (e) {
    e.preventDefault();
    e.target.reset();
    this.setState(this.baseState);

    let payload = {
      email: this.state.email,
      password: this.state.password
    };

    this.login(payload);
  }

  login (payload) {
    fetch ('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.props.authFunc(data);

        window.location.reload();
      });
  }

  render () {
    let validObj = validationFunc(
      this.state.email,
      this.state.email,
      'Username',
      this.state.password,
      this.state.password
    );

    return (
      <form onSubmit={this.submitLogin.bind(this)}>
        <fieldset className='App'>
          <div style={{ display: 'inline-grid' }}>
            <h2>Login</h2>
            <Input
              type='text'
              data='email'
              name='Email'
              func={e => {
                this.setState({ email: e.target.value });
              }}
              valid={validObj.validMail}
            />

            <Input
              type='password'
              data='password'
              name='Password'
              func={e => {
                this.setState({ password: e.target.value });
              }}
              valid={validObj.validPassword}
            />

            <input
              style={({ 'display': (validObj.validMail && validObj.validPassword) === true ? '' : 'none' })}
              type='submit'
              value='Login'
            />
          </div>
        </fieldset>
      </form>
    );
  }
}

export default LoginForm;
