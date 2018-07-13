import React, { Component } from 'react';
import requester from '../../utils/requester';
import ProfileProduct from '../partials/ProfileProduct';
import ProfileComment from '../partials/ProfileComment';
import Loader from '../common/Loader';

class Profile extends Component {
  constructor () {
    super();

    this.state = {
      loading: true,
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
              commentedProducts: commentedProducts,
              loaded: false
            });
          });
      });
  }

  render () {
    if (this.state.loaded === true || this.state.loaded === undefined) {
      return <div className='load'><Loader /></div>;
    }
    
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
