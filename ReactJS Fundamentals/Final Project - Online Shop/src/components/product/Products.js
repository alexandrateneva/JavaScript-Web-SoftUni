import React, { Component } from 'react';
import requester from '../../utils/requester';
import Product from '../partials/Product';
import Loader from '../common/Loader';

class Products extends Component {
  constructor () {
    super();

    this.state = {
      loading: true,
      products: []
    };
  }

  componentDidMount () {
    requester.similarProducts(this.props.match.params.category).then(res => {
      this.setState({
        products: res,
        loaded: false });
    });
  }

  render () {
    if (this.state.loaded === true || this.state.loaded === undefined) {
      return <div className='load'><Loader /></div>;
    }

    return (
      <div className='items'>
        {this.state.products.map((p, i) => <Product key={i} product={p} />)}
      </div>);
  }
}

export default Products;
