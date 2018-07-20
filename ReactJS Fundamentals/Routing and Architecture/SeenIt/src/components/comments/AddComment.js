import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Post from '../partials/Post';
import reqHandler from '../../utils/reqHandler';
import dataCollector from '../../utils/dataCollector';

class AddComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: '',
            postId: this.props.postId,
            author: localStorage.getItem('username')
        };
    }

    dataCollector = (e) => {
        this.setState(dataCollector(e));
    }

    addComment = (e) => {
        e.preventDefault();        
        e.target.reset();
        reqHandler.addComment(this.state).then(res => {            
            this.props.addComment(res);
        });
    }

    render() {
        return (
        <div className='post post-content'>
            <form id='commentForm' onSubmit={this.addComment.bind(this)}>
                <label>Comment</label>
                <textarea name='content' type='text' onChange={this.dataCollector.bind(this)}/>
                <input type='submit' value='Add Comment' id='btnPostComment' />
            </form>
        </div>);
    }
}

export default AddComment;
