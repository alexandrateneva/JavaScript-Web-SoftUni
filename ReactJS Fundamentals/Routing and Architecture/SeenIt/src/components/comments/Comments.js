import React, { Component } from 'react';
import PostComment from '../comments/PostComment';
import Comment from '../partials/Comment';
import AddComment from '../comments/AddComment';
import reqHandler from '../../utils/reqHandler';

class Comments extends Component {
  constructor (props) {
    super(props);

    this.state = {
      post: {
        title: '',
        url: '',
        imageUrl: '',
        description: '',
        author: ''
      },
      comments: []
    };
  }

  componentWillMount () {
    this.renderMyData();
  }

  renderMyData () {
    reqHandler.getPostDetails(this.props.match.params.id).then(post => {
      reqHandler.listComments(this.props.match.params.id).then(comments => {
        this.setState({
          post: post,
          comments: comments
        });
      });
    });
  }

  addComment = (comment) => {
    this.setState(prevState => {
        let comments = prevState.comments
        comments.splice(0,0,comment);

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

  render () {
    return (
      <section id='viewComments'>
        <PostComment post={this.state.post} />
        <AddComment postId={this.props.match.params.id} addComment={this.addComment.bind(this)} />
        {this.state.comments.map((c, i) => <Comment key={i} index={i} comment={c} deleteComment={this.deleteComment.bind(this)}/>)}
      </section>);
  }
}

export default Comments;
