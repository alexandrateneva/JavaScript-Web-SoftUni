import Loader from 'react-loader-spinner';
import React, { Component } from 'react';
import '../../style/css/site.css';

class Loading extends Component {
  render () {
    return (
      <Loader
        type='TailSpin'
        color='#C71585'
        height='200'
        width='200'
      />
    );
  }
}

export default Loading;
