import React, { Component } from 'react';
import requester from '../../utils/requester';
import ProfileProduct from '../partials/ProfileProduct';
import ProfileComment from '../partials/ProfileComment';

class Profile extends Component {
  constructor () {
    super();

    this.state = {
      likedProducts: [],
      commentedProducts: []
    };
  }

  componentWillMount () {
    requester.likedProducts(localStorage.username)
      .then(likedProducts => {
        requester.commentedProducts(localStorage.username)
          .then(commentedProducts => {
            this.setState({
              likedProducts: likedProducts,
              commentedProducts: commentedProducts
            });
          });
      });
  }

  render () {
    return (
      <div>
        <h2>Products you liked:</h2>
        <div className='items'>
          {(this.state.likedProducts.length > 0)
            ? this.state.likedProducts.map((p, i) => <ProfileProduct key={i} product={p} />)
            : <i>Тhere are no products you liked.</i>}
        </div>
        <h2>Your comments:</h2>
        <div className='comments-profile'>
          {(this.state.commentedProducts.length > 0)
            ? this.state.commentedProducts.map((c, i) => <ProfileComment style={{ display: 'block' }} comment={c} />)
            : <i>Тhere are no products you have commented on.</i>}
        </div>
      </div>
    );
  }
}

export default Profile;
