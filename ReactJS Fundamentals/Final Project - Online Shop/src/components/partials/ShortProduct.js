import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../style/css/details.css';

class ShortProduct extends Component {
  render () {
    return (
      <div className='item'>
        <Link to={`/product/${this.props.product._id}`}>
          <div className='product-img'>
            <img alt={this.props.product.name} src={this.props.product.imageUrl} />
          </div>
          <div className='product-details'>
            <h1 id='product-name'>{this.props.product.title}</h1>
            <h4 id='product-description'>{this.props.product.description}</h4>
          </div>
        </Link>
        <div className='price-add'>
          <h5 id='product-price'>${this.props.product.price}</h5>
        </div>
      </div>
    );
  }
}

export default ShortProduct;
