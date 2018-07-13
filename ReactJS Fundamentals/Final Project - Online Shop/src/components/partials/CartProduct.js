import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import removeProductFromCart from '../../utils/removeProductFromCart';
import '../../style/css/productCart.css';

class CartProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: this.props.count,
            total: this.props.total
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.product._id !== prevProps.product._id) {
            this.setState({
                count: this.props.count,
                total: this.props.total
            })
        }
    }

    deleteProduct = () => {
        removeProductFromCart(this.props.product);

        this.setState((prevState) =>
            ({
                count: prevState.count - 1,
                total: (prevState.count - 1) * this.props.product.price
            })
        )
    }

    render() {
        return (
            <div className='cart-product'>
                <div>
                    <Link to={`/product/${this.props.product._id}`}>
                        <img id='cart-product-img' alt={this.props.product.title} src={this.props.product.imageUrl} />
                    </Link>
                    <div className='order-details'>
                        <div className='product-details'>
                            <h1 id='cart-product-name'>{this.props.product.title}</h1>
                        </div>
                        <h5 id='cart-product-price'>Count: {this.state.count}</h5>
                        <h5 id='cart-product-price'>Price: {this.props.product.price} BGN</h5>
                        <h5 id='cart-product-total'>Total: {this.state.total} BGN</h5>
                        <button id='btn-delete-cart-product' onClick={this.deleteProduct}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CartProduct;
