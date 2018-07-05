import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Post extends Component {
  render () {
    const editAndDelete = ( <ul>
      <li className='action'><Link className='editLink' to={`/editPost/${this.props.post._id}`}>edit</Link></li>
      <li className='action'><Link className='deleteLink' to={`/deletePost/${this.props.post._id}`}>delete</Link></li>
    </ul>);

    return (
      <article className='post'>
        <div className='col thumbnail'>
          <a href={this.props.post.url}>
            <img src={this.props.post.imageUrl} />
          </a>
        </div>
        <div className='post-content'>
          <div className='title'>
            <a href={this.props.post.url}>
              {this.props.post.title}
            </a>
          </div>
          <div className='details'>
            <div className='info'>
              by {this.props.post.author}
            </div>
            <div className='controls'>
              {(this.props.post.author === localStorage.getItem('username')) ? editAndDelete : null} 
            </div>
          </div>
        </div>
      </article>);
  }
}

export default Post;
