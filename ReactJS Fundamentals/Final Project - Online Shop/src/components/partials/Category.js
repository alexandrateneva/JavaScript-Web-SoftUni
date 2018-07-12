import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../style/css/product.css';

class Category extends Component {
  render () {
    return (
      <div className='item'>
        <Link to={`/products/${this.props.category.name}`}>
          <div className='item-img'>
            <img style={{'borderRadius': '50%'}} alt={this.props.category.name} src={this.props.category.imageUrl} />
          </div>
          <div className='product-details'>
            <h1 id='Category-name'>{this.props.category.name}</h1>
          </div>
        </Link>
      </div>
    );
  }
}

export default Category;
