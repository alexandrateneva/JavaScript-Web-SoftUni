import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'react-materialize';
import calcTime from '../../utils/calcTime';
import addProductToCart from '../../utils/addProductToCart';
import '../../style/css/product.css';

class Product extends Component {
  render () {
    const editAndDelete = (<div>
      <Link to={`/deleteProduct/${this.props.product._id}`}> <Icon small id='delete'>delete</Icon></Link>
      <Link to={`/editProduct/${this.props.product._id}`}> <Icon small id='build'>build</Icon></Link>
    </div>);

    const buy = <a onClick={() => addProductToCart(this.props.product)}><Icon small id='add-icon'>add_shopping_cart</Icon></a>;

    return (
      <div className='item'>
        <Link to={`/product/${this.props.product._id}`}>
          <div className='product-img'>
            <img alt={this.props.product.title} src={this.props.product.imageUrl} />
          </div>
          <div className='product-details'>
            <h1 id='product-name'>{this.props.product.title}</h1>
            <h4 id='product-description'>submitted {calcTime(this.props.product._kmd.ect)}</h4>
          </div>
        </Link>
        <div className='price-add'>
          <h5 id='product-price'>{this.props.product.price} BGN</h5>
          {(localStorage.username === 'admin') ? editAndDelete : buy}
        </div>
      </div>

    );
  }
}

export default Product;
