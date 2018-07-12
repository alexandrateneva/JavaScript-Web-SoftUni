import React, { Component } from 'react';
import '../../style/css/form.css';
import dataCollector from '../../utils/dataCollector';
import requester from '../../utils/requester';
import notification from '../../utils/notification';

class OrderForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: JSON.parse(localStorage.getItem('cart')),
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
            additionalInfo: '',
            total: ''
        };
    }

    dataCollector = (e) => {
        this.setState(dataCollector(e));
        this.setState({
            total: this.calculateTotalSum()
        })
    }

    order = (e) => {
        e.preventDefault();
        if (this.state.firstName === '' || this.state.lastName === '') {
            return notification.push('error', 'First name and last name are required.');
        }
        if (this.state.address === '') {
            return notification.push('error', 'Address is requiered.');
        }
        if (this.state.phone === '') {
            return notification.push('error', 'Phone is requiered.');
        }

        requester.addOrder(this.state)
            .then(res => {
                localStorage.setItem('cart', JSON.stringify([]));
                this.props.history.push('/home')
                notification.push('success', 'Order successful!');
            });
    }

    calculateTotalSum = () => {
        let total = 0;
        let products = this.state.products;

        for (let i = 0; i < products.length; i++) {
            total += products[i].product.price * products[i].count
        }
        return total;
    }

    render() {
        return (
            <form className='add-form' onSubmit={this.order.bind(this)}>
                <h3>Order Form</h3>
                <input type='text' name='firstName' className='add-value' placeholder='First Name' onChange={this.dataCollector.bind(this)} />
                <input type='text' name='lastName' className='add-value' placeholder='Last Name' onChange={this.dataCollector.bind(this)} />
                <input type='text' name='address' className='add-value' placeholder='Аddress' onChange={this.dataCollector.bind(this)} />
                <input type='text' name='phone' className='add-value' placeholder='Phone' onChange={this.dataCollector.bind(this)} />
                <textarea type='text' name='additionalInfo' className='add-value' placeholder='Additional information' onChange={this.dataCollector.bind(this)} />
                <br />
                <h4 id='product-description'>Total Order Value: {this.calculateTotalSum()} BGN</h4>
                <input id='btn-order' type='submit' name='orderForm' value='Order' className='add-submit' />
            </form>
        );
    }
}

export default OrderForm;
