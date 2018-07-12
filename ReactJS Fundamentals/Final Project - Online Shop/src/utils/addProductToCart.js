export default (product) => {
  if (localStorage.getItem('cart') === null) {
    localStorage.setItem('cart', JSON.stringify([]));
  }

  let cart = JSON.parse(localStorage.getItem('cart'));
  let index = cart.findIndex(p => p.product._id === product._id);
  if (index >= 0) {
    cart[index].count++;
    localStorage.setItem('cart', JSON.stringify(cart));
  } else {
    let obj = {product: product, count: 1};
    cart.push(obj);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};
