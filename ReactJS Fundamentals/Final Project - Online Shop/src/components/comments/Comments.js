import React, { Component } from 'react';
import '../../style/css/comments.css';
import Comment from '../partials/Comment';
import AddComment from '../comments/AddComment';
import requester from '../../utils/requester';
import Loader from '../common/Loader';

class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            productId: this.props.productId,
            comments: []
        };
    }

    componentWillMount() {
        this.renderMyData();
    }

    componentWillReceiveProps(newProps) {        
        this.setState({
            productId: newProps.productId
        })
        this.renderMyData();
    }

    renderMyData() {
        requester.listComments(this.state.productId).then(comments => {
            this.setState({
                comments: comments  ,
                loaded: false               
            });
        });
    }

    addComment = (comment) => {
        this.setState(prevState => {
            let comments = prevState.comments
            comments.splice(0, 0, comment);

            return { comments }
        })
    }

    deleteComment = (index) => {
        this.setState(prevState => {
            let comments = prevState.comments
            comments.splice(index, 1);

            return { comments }
        })
    }

    render() {
        if (this.state.loaded === true || this.state.loaded === undefined) {
            return <div className='load'><Loader /></div>;
          }
          
        return (
            <div className='product-comments'>          
                <AddComment productId={this.state.productId} addComment={this.addComment.bind(this)} {...this.props} />
                {this.state.comments.map((c, i) => <Comment key={i} index={i} comment={c} deleteComment={this.deleteComment.bind(this)} />)}
            </div>);
    }
}

export default Comments;
