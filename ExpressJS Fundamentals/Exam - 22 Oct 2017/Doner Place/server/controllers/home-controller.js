let Product = require('../data/Product');

module.exports = {
  index: (req, res) => {
    let isAdmin = req.user && req.user.roles[0] === 'Admin';

    Product.find({}).then(products => {
      if (products.length === 0) {
        return res.render('home/index', { isAdmin: isAdmin, isEmpty: true })
      }

      let chickenDoners = products.filter(p => p.category === 'Chicken');
      let beefDoners = products.filter(p => p.category === 'Beef');
      let lambDoners = products.filter(p => p.category === 'Lamb');

      res.render('home/index', {
        isAdmin: isAdmin,
        chickenDoners: chickenDoners,
        beefDoners: beefDoners,
        lambDoners: lambDoners
      })
    })
  }
}
