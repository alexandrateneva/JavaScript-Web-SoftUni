const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)

  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/register', controllers.users.registerPost)
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)
  app.get('/users/logout', controllers.users.logout)

  app.get('/articles/create', auth.isAuthenticated, controllers.articles.createGet)
  app.post('/articles/create', auth.isAuthenticated, controllers.articles.createPost)

  app.get('/articles/all', controllers.articles.allGet)

  app.get('/article/:id', controllers.articles.detailsGet)

  app.get('/articles/latest', controllers.articles.lastArticleGet)

  app.get('/articles/edit/:id', auth.isAuthenticated, controllers.articles.editGet)
  app.post('/articles/edit/:id', auth.isAuthenticated, controllers.articles.editPost)

  app.get('/articles/lock/unlock/:id', auth.isInRole('Admin'), controllers.articles.lockUnlockGet)

  app.get('/articles/history/:id', auth.isAuthenticated, controllers.articles.historyGet)

  app.get('/articles/history/edit/:id', auth.isAuthenticated, controllers.articles.currentEditGet)

  app.post('/articles/search', controllers.articles.searchPost)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
