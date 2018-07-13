import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'react-materialize';
import requester from '../../utils/requester';
import addProductToCart from '../../utils/addProductToCart';
import likeAndDislikeProduct from '../../utils/likeAndDislikeProduct';
import ShortProduct from '../partials/ShortProduct';
import Comments from '../comments/Comments';
import Loader from '../common/Loader';

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      productId: '',
      product: '',
      similarProducts: [],
      likeBtn: '',
      likes: ''
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.id !== prevProps.match.params.id) { 
      this.setState({
        loaded: true
      });
      this.getData();
    }
  }

  getData = () => {
    requester.productDetails(this.props.match.params.id)
      .then(product => {
        requester.similarProducts(product.category)
          .then(similarProducts => {
            let index = product.likes.indexOf(localStorage.username);
            this.setState({
              product: product,
              productId: product._id,
              similarProducts: similarProducts,
              likeBtn: (index >= 0) ? 'like-icon-on' : 'like-icon-off',
              likes: product.likes.length,
              loaded: false
            });
          });
      });
  }

  setContent(obj) {
    this.setState(obj);
  }

  render() {
    const editAndDelete = (<div>
      <Link to={`/deleteProduct/${this.props.match.params.id}`}> <Icon small id='delete'>delete</Icon></Link>
      <Link to={`/editProduct/${this.props.match.params.id}`}> <Icon small id='build'>build</Icon></Link>
    </div>);

    const buyAndLike = (<div>
      <a onClick={() => addProductToCart(this.state.product)}><Icon small id='add-icon'>add_shopping_cart</Icon></a>
      <a onClick={() => likeAndDislikeProduct(this.state.likeBtn, this.setContent.bind(this), this.props)}><Icon small className={this.state.likeBtn}>favorite</Icon></a>
      <h5>{this.state.likes} Likes</h5>
    </div>);

    if (this.state.loaded === true || this.state.loaded === undefined) {
      return <div className='load'><Loader /></div>
    }

    return (<div className='show-product'>
      <div className='item-wrapper'>
        <div className='item-image'>
          <img className='product-image' src={this.state.product.imageUrl} alt='product' />
        </div>
        <div className='item-name'>
          <div className='product-info'>
            <h3 id='product-name'>{this.state.product.title}</h3>
          </div>
          <div className='product-bio'>
            <p id='product-description'>{this.state.product.description}</p>
            <p id='product-price'>{this.state.product.price} BGN</p>
            {(localStorage.username === 'admin') ? editAndDelete : buyAndLike}
          </div>
        </div>
        <Comments style={{ display: 'block' }} {...this.props} />
      </div>
      <div className='similar-products'>
        <h5>You might also like</h5>
        {this.state.similarProducts.map((product) =>
          (product.title !== this.state.product.title)
            ? <ShortProduct key={product._id} product={product} />
            : null)}
      </div>
    </div>)
  }
}

export default ProductDetails;
