import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import requester from '../../utils/requester';
import dataCollector from '../../utils/dataCollector';
import notification from '../../utils/notification';

class EditProduct extends Component {
    constructor() {
        super();

        this.state = {
            title: '',
            imageUrl: '',
            description: '',
            category: '',
            price: ''
        };
    }

    componentDidMount() {
        requester.productDetails(this.props.match.params.id)
            .then(res => {
                this.setState({
                    title: res.title,
                    imageUrl: res.imageUrl,
                    description: res.description,
                    category: res.category,
                    price: res.price
                });
            });
    }

    dataCollector = (e) => {
        this.setState(dataCollector(e));
    }

    editProduct = (e) => {
        e.preventDefault();
        if (this.state.title === '' || this.state.price === '' || this.state.imageUrl === '') {
            return notification.push('error', 'Title, image and price are required.');
        }
        requester.editProduct(this.props.match.params.id, this.state).then(res => {
            this.props.history.push('/');
            notification.push('success', 'Product edited successfully!');
        });
    }

    render() {
        if(localStorage.username !== 'admin'){
            return <Redirect to='/home' />
        }

        return (
            <form className='add-form' onSubmit={this.editProduct.bind(this)}>
                <div>
                    <h2>Edit Product</h2>
                </div>
                <b>Title:</b>
                <input type='text' name='title' className='add-value' value={this.state.title} onChange={this.dataCollector.bind(this)} />
                <b>Price:</b>
                <input type='number' name='price' className='add-value' value={this.state.price} onChange={this.dataCollector.bind(this)} />
                <b>ImageUrl:</b>
                <input type='text' name='imageUrl' className='add-value' value={this.state.imageUrl} onChange={this.dataCollector.bind(this)} />
                <b>Description:</b>
                <textarea type='text' name='description' className='add-value' value={this.state.description} onChange={this.dataCollector.bind(this)} />
                <b>Category:</b>
                <input type='text' name='category' className='add-value' value={this.state.category} onChange={this.dataCollector.bind(this)} />
                <input type='submit' name='EditProduct' value='Edit' className='add-submit' />
            </form>);
    }
}

export default EditProduct;
