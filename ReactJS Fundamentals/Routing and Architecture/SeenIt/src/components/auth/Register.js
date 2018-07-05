import React, { Component } from 'react';
import dataCollector from './../../utils/dataCollector';
import reqHandler from './../../utils/reqHandler';
import observer from '../../utils/observer';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            repeatPass: ''
        };
    }

    dataCollector = (e) => {
        this.setState(dataCollector(e));
    }

    register = (e) => {
        e.preventDefault();
        if (this.state.username === '' || this.state.password === '') {
            observer.trigger(observer.events.notification, {
                type: 'error',
                message: 'Please, fill in the username and password.'
            });
            return;
        }
        if (this.state.password !== this.state.repeatPass) {
            observer.trigger(observer.events.notification, {
                type: 'error',
                message: 'Password and repeated password don`t match.'
            });
            return;
        }

        reqHandler.register({ username: this.state.username, password: this.state.password })
            .then(res => {
                if (res.error) {
                    observer.trigger(observer.events.notification, {
                        type: 'error',
                        message: `Invalid registration! ${res.error}`
                    });
                    return;
                }

                localStorage.setItem('token', res._kmd.authtoken);
                localStorage.setItem('username', res.username);
                observer.trigger(observer.events.loginUser, res.username);
                observer.trigger(observer.events.notification, {
                    type: 'success',
                    message: 'Registrate successful!'
                });
            });
    }

    render() {
        return (
            <form id='registerForm' onSubmit={this.register.bind(this)}>
                <h2>Register</h2>
                <label>Username:</label>
                <input name='username' type='text' onChange={this.dataCollector.bind(this)} />
                <label>Password:</label>
                <input name='password' type='password' onChange={this.dataCollector.bind(this)} />
                <label>Repeat Password:</label>
                <input name='repeatPass' type='password' onChange={this.dataCollector.bind(this)} />
                <input id='btnRegister' value='Sign Up' type='submit' />
            </form>
        );
    }
}

export default Register;
