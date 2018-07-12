import React, { Component } from 'react';
import requester from '../../utils/requester';
import Category from '../partials/Category';

class Categories extends Component {
  constructor () {
    super();

    this.state = {
      categories: []
    };
  }

  componentDidMount () {
    requester.listCategories().then(res => {
      this.setState({ categories: res });
    });
  }

  render () {
    return (
      <div className='items'>
        {this.state.categories.map((c, i) => <Category key={i} category={c} />)}
      </div>);
  }
}

export default Categories;
