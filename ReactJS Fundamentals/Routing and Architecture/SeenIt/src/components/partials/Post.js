import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import calcTime from '../../utils/calcTime';

class Post extends Component {
  render () {
    const editAndDelete = (<ul style={{display: 'inline'}}>
      <li className='action'><Link className='editLink' to={`/editPost/${this.props.post._id}`}>edit</Link></li>
      <li className='action'><Link className='deleteLink' to={`/deletePost/${this.props.post._id}`}>delete</Link></li>
    </ul>);

    return (
      <article className='post'>
        <div className='col rank'>
          <span>{this.props.rank + 1}</span>
        </div>
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
              submitted {calcTime(this.props.post._kmd.ect)} ago by {this.props.post.author}
            </div>
            <div className='controls'>
              <ul>
                <li className='action'><Link className='commentsLink' to={`/comments/${this.props.post._id}`}>comments</Link></li>
                {(this.props.post.author === localStorage.getItem('username')) ? editAndDelete : null}
              </ul>
            </div>

          </div>
        </div>
      </article>);
  }
}

export default Post;
