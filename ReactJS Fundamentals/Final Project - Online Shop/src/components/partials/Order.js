import React, { Component } from 'react';
import calcTime from '../../utils/calcTime';
import requester from '../../utils/requester';

class Order extends Component {
    deleteOrder = () => {
        requester.deleteOrder(this.props.order._id).then(res => {
            this.props.deleteOrder(this.props.order._id);
        });
    }

    render() {
        return (
            <div id='order-box'>
                <div>
                    <div className='order-details'>
                        <div className='product-details'>
                            <h1 id='cart-product-name'>Order - {this.props.order._id}</h1>
                        </div>
                        <h5 id='cart-product-price'>Client: {this.props.order.firstName} {this.props.order.lastName}</h5>
                        <h5 id='cart-product-price'>Phone: {this.props.order.phone}</h5>
                        <h5 id='cart-product-price'>Address: {this.props.order.address}</h5>
                        <h5 id='cart-product-price'>Date: {calcTime(this.props.order._kmd.ect)}</h5>                        
                        <h5 id='cart-product-price'>Additional info: {this.props.order.additionalInfo}</h5>
                        <h5 id='cart-product-price'>Products:</h5>
                        {this.props.order.products.map((p, i) => <p key={i}>{p.product._id} - {p.product.title} - {p.count} count</p>)}
                        <h5 id='cart-product-total'>Total: {this.props.order.total} BGN</h5>
                        <button id='btn-delete-cart-product' onClick={this.deleteOrder}>Done</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Order;