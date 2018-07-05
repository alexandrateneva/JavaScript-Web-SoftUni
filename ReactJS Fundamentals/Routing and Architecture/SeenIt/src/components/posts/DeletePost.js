import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import reqHandler from '../../utils/reqHandler';
import observer from '../../utils/observer';

class DeletePost extends Component {
  componentDidMount () {
    reqHandler.deletePost(this.props.match.params.id).then(res => {
      observer.trigger(observer.events.notification, {
        type: 'success',
        message: 'Post successfully deleted!'
      });
    });
  }

  render () {
    return <Redirect to='/catalog' />;
  }
}

export default DeletePost;
