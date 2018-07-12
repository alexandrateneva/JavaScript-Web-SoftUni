import React, { Component } from 'react';
import calcTime from '../../utils/calcTime';
import requester from '../../utils/requester';

class Comment extends Component {
    deleteComment = () => {
        requester.deleteComment(this.props.comment._id).then(res => {
            this.props.deleteComment(this.props.comment._id);
        });
    }

    render() {
    const deleteBtn = (<div style={{display: 'inline'}}>  |  <button id='btnDelete' onClick={this.deleteComment}>delete</button></div>);
        return (
            <article className='comment comment-content'>
                <p>{this.props.comment.content}</p>
                <div className='info'>
                    submitted {calcTime(this.props.comment._kmd.ect)} ago by {this.props.comment.author}  
                    {(this.props.comment.author === localStorage.getItem('username')) ? deleteBtn : null}
                </div>
            </article>);
    }
}

export default Comment;
