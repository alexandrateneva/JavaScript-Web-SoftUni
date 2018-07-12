import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import calcTime from '../../utils/calcTime';
import '../../style/css/productProfile.css';

class ProfileProduct extends Component {
  render () {
    return (
      <div className='profileProduct-item'>
        <Link to={`/product/${this.props.product._id}`}>
          <div>
            <img alt={this.props.product.title} src={this.props.product.imageUrl} id='profileProduct-img' />
          </div>
          <div className='profileProduct-details'>
            <h1 id='profileProduct-name'>{this.props.product.title}</h1>
            <h4 id='profileProduct-description'>submitted {calcTime(this.props.product._kmd.ect)}</h4>
          </div>
        </Link>
        <div className='price-add'>
          <h5 id='profileProduct-price'>{this.props.product.price} BGN</h5>
        </div>
      </div>
    );
  }
}

export default ProfileProduct;
