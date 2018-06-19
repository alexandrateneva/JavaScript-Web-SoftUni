const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  
  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/register', controllers.users.registerPost)
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)
  app.get('/users/logout', controllers.users.logout)

  app.get('/create/product', auth.isInRole('Admin'), controllers.product.createGet);
  app.post('/create/product', auth.isInRole('Admin'), controllers.product.createPost);

  app.get('/edit/product/:id', auth.isInRole('Admin'), controllers.product.editGet);
  app.post('/edit/product/:id', auth.isInRole('Admin'), controllers.product.editPost);

  app.get('/delete/product/:id', auth.isInRole('Admin'), controllers.product.deleteGet);

  app.get('/order/status', auth.isAuthenticated, controllers.order.statusGet);
  app.get('/all/orders', auth.isInRole('Admin'), controllers.order.allOrdersGetAdmin);
  app.post('/all/orders', auth.isInRole('Admin'), controllers.order.changeStatusByAdminPost);

  app.get('/customize-order/:id', auth.isAuthenticated, controllers.order.createGet);
  app.post('/customize-order/:id', auth.isAuthenticated, controllers.order.createPost);

  app.get('/order-details/:id', auth.isAuthenticated, controllers.order.detailsGet);  

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
