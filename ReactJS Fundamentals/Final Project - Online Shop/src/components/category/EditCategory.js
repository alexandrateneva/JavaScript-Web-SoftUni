import React, { Component } from 'react';
import requester from '../../utils/requester';
import dataCollector from '../../utils/dataCollector';
import notification from '../../utils/notification';
import '../../style/css/site.css';

class EditCategory extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            imageUrl: ''
        };
    }

    componentWillMount() {
        requester.getCategory(this.props.match.params.id)
            .then(res => {
                this.setState({
                    name: res.name,
                    imageUrl: res.imageUrl
                });
            });
    }

    dataCollector = (e) => {
        this.setState(dataCollector(e));
    }

    editCategory = (e) => {
        e.preventDefault();
        if (this.state.title === '') {
            return notification.push('error', 'Category name is required.');
        }
        requester.editCategory(this.props.match.params.id, this.state).then(res => {
            this.props.history.push('/categories');
            notification.push('success', 'Category edited successfully!');
        });
    }

    render() {
        return (
            <form className='add-form' onSubmit={this.editCategory.bind(this)}>
                <div>
                    <h2>Edit Category</h2>
                </div>
                <b>Name:</b>
                <input type='text' name='name' className='add-value' value={this.state.name} onChange={this.dataCollector.bind(this)} />
                <b>Image URL:</b>
                <input type='text' name='imageUrl' className='add-value' value={this.state.imageUrl} onChange={this.dataCollector.bind(this)} />
                <input type='submit' name='EditCategory' value='Edit' className='add-submit' />
            </form>);
    }
}

export default EditCategory;
