const encryption = require('../utilities/encryption');
const User = require('mongoose').model('User');

module.exports = {
  registerGet: (req, res) => {
    res.render('users/register');
  },
  registerPost: (req, res) => {
    let reqUser = req.body;

    if (req.body.repeadetPassword !== req.body.password) {
      res.locals.globalError = "Password and repeated password don't match.";
      return res.render('users/register');
    }

    User.findOne({ email: reqUser.email }).then(user => {
      if (user) {
        res.locals.globalError = 'Already exist user with this email.';
        return res.render('users/register');
      } else {
        let salt = encryption.generateSalt();
        let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password);

        User.create({
          email: reqUser.email,
          salt: salt,
          hashedPass: hashedPassword
        }).then(user => {
          req.logIn(user, (err, user) => {
            if (err) {
              res.locals.globalError = err;
              res.render('users/register', user);
            }

            res.redirect('/');
          })
        })
      }
    })
  },
  loginGet: (req, res) => {
    res.render('users/login');
  },
  loginPost: (req, res) => {
    let reqUser = req.body
    User
      .findOne({ email: reqUser.email }).then(user => {
        if (!user) {
          res.locals.globalError = 'Invalid user data';
          return res.render('users/login');
        }

        if (!user.authenticate(reqUser.password)) {
          res.locals.globalError = 'Invalid user data';
          return res.render('users/login');
        }

        req.logIn(user, (err, user) => {
          if (err) {
            res.locals.globalError = err;
            res.render('users/login');
          }

          res.redirect('/');
        })
      })
  },
  logout: (req, res) => {
    req.logout();
    res.redirect('/');
  }
}
