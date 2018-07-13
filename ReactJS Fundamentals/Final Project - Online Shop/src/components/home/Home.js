import React, { Component } from 'react';
import requester from '../../utils/requester';
import Product from '../partials/Product';
import Loader from '../common/Loader';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      products: []
    };
  }

  componentWillMount() {
    if (localStorage.username === undefined) {
      requester.login({ username: 'guest', password: '123' })
        .then(res => {
          localStorage.setItem('token', res._kmd.authtoken);          
          localStorage.setItem('username', res.username);
          this.getData(res._kmd.authtoken);
        });
    } else {
      this.getData(localStorage.token);
    }
  }

  getData = (token) => {
    requester.listProducts(token).then(res => {
      this.setState({ 
        products: res,
        loaded: false });
    });
  }

  render() {
    if (this.state.loaded === true || this.state.loaded === undefined) {
      return <div className='load'><Loader /></div>
    }
    
    return (
      <div className='items'>
        {this.state.products.map((p, i) => <Product key={i} product={p} />)}
      </div>);
  }
}

export default Home;
