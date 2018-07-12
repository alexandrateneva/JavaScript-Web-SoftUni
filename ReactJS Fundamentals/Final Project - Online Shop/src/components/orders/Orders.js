import React, { Component } from 'react';
import requester from '../../utils/requester';
import Order from '../partials/Order';

class Orders extends Component {
  constructor () {
    super();

    this.state = {
      orders: []
    };
  }

  componentDidMount () {
    requester.listOrders().then(res => {
      this.setState({ orders: res });
    });
  }

  deleteOrder = (index) => {
    this.setState(prevState => {
        let orders = prevState.orders;
        orders.splice(index, 1);
  
        return { orders };
    })
}

  render () {
    return (<div>
      <h1>Orders</h1>
      <div className='items'>
        {this.state.orders.map((o, i) => <Order key={i} order={o} deleteOrder={this.deleteOrder.bind(this)}/>)}
      </div>
      </div>);
  }
}

export default Orders;
