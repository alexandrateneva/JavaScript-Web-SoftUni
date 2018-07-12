import React, { Component } from 'react';
import observer from '../../utils/observer';
import '../../style/css/notifications.css';

const defaultState = {
  message: null,
  success: null,
  error: null,
  loading: null
};

class Notification extends Component {
  constructor (props) {
    super(props);

    this.state = defaultState;

    observer.subscribe(observer.events.notification, this.showNotification);
  }

  showNotification = data => {
      let message = data.message;
      let type = data.type;
      this.setState({[type]: type, message: message});

      setTimeout(() => { this.hideNotification()}, 3000);
  }

  hideNotification = ev => this.setState(defaultState);

  render () {
      let notificationId;
      if(this.state.success){
          notificationId = 'successBox';
      } else if (this.state.error){
        notificationId = 'errorBox';
      } else if (this.state.leading){
        notificationId = 'LoadingBox';
      }
    return (<div id={notificationId} className="notification"><span>{this.state.message}</span></div>);
  }
}

export default Notification;
