import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import requester from '../../utils/requester';
import dataCollector from '../../utils/dataCollector';
import notification from '../../utils/notification';
import '../../style/css/site.css';

class AddCategory extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            imageUrl: ''
        };
    }

    dataCollector = (e) => {
        this.setState(dataCollector(e));
    }

    addCategory = (e) => {
        e.preventDefault();
        if (this.state.name === '') {
            return notification.push('error', 'Name of category is required.');
        }
        requester.addCategory(this.state).then(res => {
            this.setState({
                name: '',
                imageUrl: ''
            })
            this.props.addCategory(res);
            notification.push('success', 'Category added successfully!');
        });
    }

    render() {
        if(localStorage.username !== 'admin'){
            return <Redirect to='/home' />
        }

        return (
            <form className='add-form' onSubmit={this.addCategory.bind(this)}>
                <div>
                    <h2>Add category</h2>
                </div>
                <input type='text' name='name' className='add-value' value={this.state.name} placeholder='Name' onChange={this.dataCollector.bind(this)} />
                <input type='text' name='imageUrl' className='add-value' value={this.state.imageUrl} placeholder='Image URL' onChange={this.dataCollector.bind(this)} />
                <input type='submit' name='AddCategory' value='Add' className='add-submit' />
            </form>);
    }
}

export default AddCategory;
