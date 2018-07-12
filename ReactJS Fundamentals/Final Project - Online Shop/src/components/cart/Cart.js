import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartProduct from '../partials/CartProduct';

class BuyProduct extends Component {
  render () {
    let products = JSON.parse(localStorage.getItem('cart'));
    return (
      <div>
        <h3>This is your cart</h3>
        <div className='cart-items'>
          {(products !== null && products.length > 0)
            ? products.map((p, i) => <CartProduct key={i}
              product={p.product}
              count={p.count}
              total={p.product.price * p.count} />)
            : null}
        </div>

        <div id='order'>
          {(products !== null && products.length > 0)
            ? <Link to='/order'><button id='btn-order'>Go to Order Form  &gt;&gt;&gt;</button></Link>
            : <i>Тhere are no products in your cart.</i>}
        </div>
      </div>
    );
  }
}

export default BuyProduct;
