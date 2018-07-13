import requester from '../utils/requester';
import notification from '../utils/notification';

export default (state, productId, setState, props) => {
  if (localStorage.username === 'guest') {
    notification.push('error', 'For like, please first login.');
    props.history.push('/login');
    return;
  }

  if (state.likeBtn === 'like-icon-off') {
    setState({
      likeBtn: 'like-icon-on'
    });
  } else {
    setState({
      likeBtn: 'like-icon-off'
    });
  }
  requester.productDetails(productId)
    .then(product => {
      let index = product.likes.indexOf(localStorage.username);
      if (index >= 0) {
        product.likes.splice(index, 1);
      } else {
        product.likes.push(localStorage.username);
      }
      requester.editProduct(productId, product)
        .then(res => {
          setState({
            likes: res.likes.length
          });
        });
    });
};
