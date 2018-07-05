import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Catalog from '../posts/Catalog';
import MyPosts from '../posts/MyPosts';
import AddPost from '../posts/AddPost';

import EditPost from '../posts/EditPost';
import DeletePost from '../posts/DeletePost';
import Comments from '../comments/Comments';

class ViewComponent extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={Catalog} />
        <Route path='/catalog' component={Catalog} />
        <Route path='/addPost' component={AddPost} />
        <Route path='/myPosts' component={MyPosts} />
        <Route path='/editPost/:id' component={EditPost} />
        <Route path='/deletePost/:id' component={DeletePost} />
        <Route path='/comments/:id' component={Comments} /> 
      </Switch>
    );
  }
}

export default ViewComponent;
