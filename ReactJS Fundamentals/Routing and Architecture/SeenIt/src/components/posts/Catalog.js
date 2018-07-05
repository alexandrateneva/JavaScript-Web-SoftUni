import React, { Component } from 'react';
import Post from '../partials/Post';
import reqHandler from '../../utils/reqHandler';
import observer from '../../utils/observer';

class Catalog extends Component {
  constructor () {
    super();

    this.state = {
      posts: []
    };
  }

  componentWillMount () {
    reqHandler.listPosts().then(res => {
      this.setState({ posts: res });
    }).catch(res => {
      observer.trigger(observer.events.notification, {
        type: 'success',
        message: res.description});
    });
  }

  render () {
    return (
      <section id='viewCatalog'>
        <div className='posts'>
          {this.state.posts.map((p, i) => <Post key={i} rank={i} post={p} />)}
        </div>
      </section>);
  }
}

export default Catalog;
