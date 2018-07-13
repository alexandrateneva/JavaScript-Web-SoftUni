import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import requester from '../../utils/requester';
import notification from '../../utils/notification';
import '../../style/css/delete.css';

class DeleteProduct extends Component {
    deleteProduct = (e) => {
        e.preventDefault();
        requester.deleteProduct(this.props.match.params.id).then(res => {
            this.props.history.push('/');
            notification.push('success', 'Product deleted successfully!');
        });
    }

    render() {
        if(localStorage.username !== 'admin'){
            return <Redirect to='/home' />
        }

        return (<div className='delete-container'>
            <h5>Are you sure you want to delete this product?</h5>
            <button className='danger' onClick={this.deleteProduct}>Yes</button>
            <Link to='/home'><button className='calm'>No</button></Link>
        </div>);
    }
}

export default DeleteProduct;
