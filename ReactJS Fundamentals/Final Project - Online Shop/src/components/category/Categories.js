import React, { Component } from 'react';
import requester from '../../utils/requester';
import Category from '../partials/Category';
import Loader from '../common/Loader';

class Categories extends Component {
  constructor () {
    super();

    this.state = {
      loading: true,
      categories: []
    };
  }

  componentDidMount () {
    requester.listCategories().then(res => {
      this.setState({
        categories: res,
        loaded: false
      });
    });
  }

  render () {
    if (this.state.loaded === true || this.state.loaded === undefined) {
      return <div className='load'><Loader /></div>;
    }

    return (
      <div className='items'>
        {this.state.categories.map((c, i) => <Category key={i} category={c} />)}
      </div>);
  }
}

export default Categories;
