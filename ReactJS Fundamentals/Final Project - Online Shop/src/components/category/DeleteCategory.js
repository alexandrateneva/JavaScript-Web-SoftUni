import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import requester from '../../utils/requester';
import notification from '../../utils/notification';
import '../../style/css/delete.css';

class DeleteCategory extends Component {
    constructor() {
        super();
        
    this.state = {
        products: 0
      };
    }

    deleteCategory = (e) => {
        e.preventDefault();
        requester.deleteCategory(this.props.match.params.id).then(res => {
            this.props.history.push('/categories');
            notification.push('success', 'Category deleted successfully!');
        });
    }

    render() {
        return (<div className='delete-container'>
        <h5>Are you sure you want to delete this category, maybe products related to it?</h5>
        <button className='danger' onClick={this.deleteCategory}>Yes</button>
        <Link to='/categories'><button className='calm'>No</button></Link>
        </div>);
    }
}

export default DeleteCategory;
