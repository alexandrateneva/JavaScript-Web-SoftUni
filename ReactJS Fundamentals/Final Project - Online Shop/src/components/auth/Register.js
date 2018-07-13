import React, { Component } from 'react';
import '../../style/css/form.css';
import dataCollector from '../../utils/dataCollector';
import requester from '../../utils/requester';
import observer from '../../utils/observer';
import notification from '../../utils/notification';

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
            return notification.push('error', 'Username and password are required.');
        }
        if (this.state.password !== this.state.repeatPass) {
            return notification.push('error', 'Password and repeated password don`t match.');
        }

        requester.register({ username: this.state.username, password: this.state.password })
            .then(res => {
                if (res.error) {
                    return notification.push('error', `Invalid registration! ${res.error}`);
                }

                localStorage.setItem('token', res._kmd.authtoken);
                localStorage.setItem('username', res.username);
                observer.trigger(observer.events.loginUser, res.username);
                this.props.history.push('/home');
                notification.push('success', 'Registrate successful!');
            });
    }

    render() {
        return (
            <form className='add-form' onSubmit={this.register.bind(this)}>
                <p className='add-text'>
                    <span className='fa-stack fa-lg'>
                        <i className='fa fa-circle fa-stack-2x' />
                        <i className='fa fa-lock fa-stack-1x' />
                    </span>
                </p>
                <input type='text' name='username' className='add-value' placeholder='Username' onChange={this.dataCollector.bind(this)} />
                <input type='password' name='password' className='add-value' placeholder='Password' onChange={this.dataCollector.bind(this)} />
                <input type='password' name='repeatPass' className='add-value' placeholder='Repeat Password' onChange={this.dataCollector.bind(this)} />
                <input type='submit' name='Register' value='Register' className='add-submit' />
            </form>
        );
    }
}

export default Register;
