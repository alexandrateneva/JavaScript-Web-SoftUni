const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)  
  app.get('/list', controllers.home.getList)

  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/register', controllers.users.registerPost)
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)
  app.get('/users/logout', controllers.users.logout)

  app.get('/addCategory', auth.isInRole('Admin'), controllers.category.createGet)
  app.post('/addCategory', auth.isInRole('Admin'), controllers.category.createPost)

  app.get('/addHotel', auth.isAuthenticated, controllers.hotel.createGet)
  app.post('/addHotel', auth.isAuthenticated, controllers.hotel.createPost)

  app.get('/hotel/:id', auth.isAuthenticated, controllers.hotel.detailsGet)

  app.post('/comment/:id', auth.isAuthenticated, controllers.hotel.createCommentPost)

  app.get('/profile/:username', auth.isAuthenticated, controllers.users.profileGet)

  app.get('/like/:id', auth.isAuthenticated, controllers.hotel.likeGet)
  app.get('/dislike/:id', auth.isAuthenticated, controllers.hotel.dislikeGet)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
