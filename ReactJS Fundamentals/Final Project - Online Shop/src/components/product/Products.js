import React, { Component } from 'react';
import requester from '../../utils/requester';
import Product from '../partials/Product';

class Products extends Component {
  constructor () {
    super();

    this.state = {
      products: []
    };
  }

  componentDidMount () {
    requester.similarProducts(this.props.match.params.category).then(res => {
      this.setState({ products: res });
    });
  }

  render () {
    return (
      <div className='items'>
        {this.state.products.map((p, i) => <Product key={i} product={p} />)}
      </div>);
  }
}

export default Products;
