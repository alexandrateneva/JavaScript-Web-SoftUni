import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import calcTime from '../../utils/calcTime';
import '../../style/css/comments.css';

class ProfileComment extends Component {
  render () {
    return (
      <article className='comment-profile'>
        <Link to={`/product/${this.props.comment.productId}`}>
          <p>{this.props.comment.content}</p>          
        </Link>
        <div className='info'>
                    submitted {calcTime(this.props.comment._kmd.ect)} ago
        </div>
      </article>
    );
  }
}

export default ProfileComment;
