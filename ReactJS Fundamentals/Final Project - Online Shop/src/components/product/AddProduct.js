import React, { Component } from 'react';
import requester from '../../utils/requester';
import dataCollector from '../../utils/dataCollector';
import notification from '../../utils/notification';

class AddProduct extends Component {
    constructor() {
        super();

        this.state = {
            title: '',
            imageUrl: '',
            description: '',
            category: '',
            price: '',
            categories: []
        };
    }

    dataCollector = (e) => {
        this.setState(dataCollector(e));
    }

    componentWillMount() {
        requester.listCategories().then(res => {
            this.setState({
                categories: res
            })
        })
    }

    addProduct = (e) => {
        e.preventDefault();
        if (this.state.title === '' || this.state.price === '') {
            return notification.push('error', 'Title and price are required.');
        }
        if (this.state.imageUrl === '') {
            return notification.push('error', 'Image URL is required.');
        }
        if (this.state.category === '') {
            return notification.push('error', 'Please, choose category.It is required.');
        }

        let obj = {
            title: this.state.title,
            imageUrl: this.state.imageUrl,
            description: this.state.description,
            category: this.state.category,
            price: this.state.price,
            likes: []
        }
        requester.addProduct(obj).then(res => {
            this.props.history.push('/home');
            notification.push('success', 'Product edited successfully!');
        });
    }

    render() {
        return (
            <form className='add-form' onSubmit={this.addProduct.bind(this)}>
                <div>
                    <h2>Add Product</h2>
                    <p>Please, fill out the form. Title, images and price are required.</p>
                </div>
                <input type='text' name='title' className='add-value' placeholder='Title' onChange={this.dataCollector.bind(this)} />
                <input type='number' name='price' className='add-value' placeholder='Price' onChange={this.dataCollector.bind(this)} />
                <input type='text' name='imageUrl' className='add-value' placeholder='ImageUrl' onChange={this.dataCollector.bind(this)} />
                <textarea type='text' name='description' className='add-value' placeholder='Description' onChange={this.dataCollector.bind(this)} />
                <select name='category' className='add-value' onChange={this.dataCollector.bind(this)}>
                    <option className='option' value="" disabled selected>Category</option>
                    {this.state.categories.map((c, i) => <option name='category' key={i} value={c.name}>{c.name}</option>)}
                </select>
                <input type='submit' name='AddProduct' value='Add' className='add-submit' />
            </form>
        );
    }
}

export default AddProduct;
