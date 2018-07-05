import React, { Component } from 'react';
import Post from '../partials/Post';
import reqHandler from '../../utils/reqHandler';

class MyPosts extends Component {
  constructor () {
    super();

    this.state = {
      myPosts: []
    };
  }

  componentWillMount () {
    reqHandler.listMyPosts().then(res => {
      this.setState({myPosts: res});
    });
  }

  render () {
    return (<section id='viewMyPosts'>
      <div className='post post-content'>
        <h1>Your Posts</h1>
      </div>
      <div className='posts'>
        {this.state.myPosts.map((p, i) => <Post key={i} rank={i} post={p} />)}
      </div>
    </section>);
  }
}

export default MyPosts;
