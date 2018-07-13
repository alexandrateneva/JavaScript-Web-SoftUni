import requester from '../utils/requester';
import notification from '../utils/notification';

export default (likeBtn, setState, props) => {
  if (localStorage.username === 'guest') {
    notification.push('error', 'For like, please first login.');
    props.history.push('/login');
    return;
  }
  requester.productDetails(props.match.params.id)
    .then(product => {
      console.log(props.match.params.id)
      console.log(product)
      let index = product.likes.indexOf(localStorage.username);
      if (index >= 0) {
        product.likes.splice(index, 1);
      } else {
        product.likes.push(localStorage.username);
      }
      requester.editProduct(props.match.params.id, product)
        .then(res => {        
          setState({
            likes: res.likes.length,
            likeBtn: (likeBtn === 'like-icon-on') ? 'like-icon-off' : 'like-icon-on'
          });
        });
    });
};
