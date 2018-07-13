import React, { Component } from 'react';
// import '../../style/css/form.css';
import dataCollector from '../../utils/dataCollector';
import requester from '../../utils/requester';
import observer from '../../utils/observer';
import notification from '../../utils/notification';

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
            return notification.push('error', 'Username and password are required.');
        }

        requester.login({ username: this.state.username, password: this.state.password })
            .then(res => {
                if (res.error) {
                    return notification.push('error', `Invalid registration! ${res.error}`);
                }

                localStorage.setItem('token', res._kmd.authtoken);
                localStorage.setItem('username', res.username);
                observer.trigger(observer.events.loginUser, res.username);
                this.props.history.push('/home');
                notification.push('success', 'Login successful!');
            });
    }

    render() {
        return (
            <form className='add-form' onSubmit={this.login.bind(this)}>
                <p className='add-text'>
                    <span className='fa-stack fa-lg'>
                        <i className='fa fa-circle fa-stack-2x' />
                        <i className='fa fa-lock fa-stack-1x' />
                    </span>
                </p>
                <input type='text' name='username' className='add-value' placeholder='Username' onChange={this.dataCollector.bind(this)} />
                <input type='password' name='password' className='add-value' placeholder='Password' onChange={this.dataCollector.bind(this)} />
                <input type='submit' name='Login' value='Login' className='add-submit' />
            </form>
        );
    }
}

export default Login;
