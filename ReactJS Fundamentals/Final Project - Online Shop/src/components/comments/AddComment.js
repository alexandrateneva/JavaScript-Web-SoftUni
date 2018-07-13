import React, { Component } from 'react';
import requester from '../../utils/requester';
import notification from '../../utils/notification';
import dataCollector from '../../utils/dataCollector';

class AddComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: '',
            author: '',
            productId: ''
        };
    }

    componentDidMount() {
        this.setState({
            author: localStorage.getItem('username')
        })
    }

    dataCollector = (e) => {
        this.setState(dataCollector(e));
    }

    addComment = (e) => {
        e.preventDefault();
        let obj = {
            content: this.state.content,
            author: this.state.author,
            productId:  this.props.productId
        }
        if (localStorage.username === 'guest') {
            notification.push('error', 'For comment, please first login.');
            this.props.history.push('/login');
        } else {
            if (this.state.content === '') {
                return notification.push('error', 'Уou need to fill out content of the comment.');
            }

            requester.addComment(obj).then(res => {
                this.props.addComment(res);
            });
        }

        this.setState({
            content: ''
        })
    }

    render() {
        return (
            <div className='post post-content'>
                <form id='commentForm' onSubmit={this.addComment.bind(this)}>
                    <label>Comment</label>
                    <textarea name='content' value={this.state.content} type='text' onChange={this.dataCollector.bind(this)} />
                    <input type='submit' value='Add Comment' id='btnPostComment' />
                </form>
            </div>);
    }
}

export default AddComment;
