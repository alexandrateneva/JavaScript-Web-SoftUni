const encryption = require('../utilities/encryption')
const User = require('mongoose').model('User')

module.exports = {
  registerGet: (req, res) => {
    res.render('users/register')
  },
  registerPost: (req, res) => {
    let reqUser = req.body
    // Add validations!

    let salt = encryption.generateSalt()
    let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)

    User.create({
      username: reqUser.username,
      firstName: reqUser.firstName,
      lastName: reqUser.lastName,
      salt: salt,
      hashedPass: hashedPassword
    }).then(user => {
      req.logIn(user, (err, user) => {
        if (err) {
          res.render('users/register', {user:user, error: err});
        }

        res.redirect('/')
      })
    })
  },
  loginGet: (req, res) => {
    res.render('users/login')
  },
  loginPost: (req, res) => {
    let reqUser = req.body
    User
      .findOne({ username: reqUser.username }).then(user => {
        if (!user) {
          res.render('users/login', {error: 'Invalid user data'})
          return
        }

        if (!user.authenticate(reqUser.password)) {
          res.render('users/login', {error: 'Invalid user data'})
          return
        }

        req.logIn(user, (err, user) => {
          if (err) {
            res.render('users/login', {error: err})
          }

          res.redirect('/')
        })
      })
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  }
}
