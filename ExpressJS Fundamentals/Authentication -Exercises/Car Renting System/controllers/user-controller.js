const User = require('../models/User');
const Car = require('../models/Car');
const encryption = require('../utilities/encryption');

module.exports.registerGet = (req, res) => {
    res.render('users/register');
}

module.exports.registerPost = (req, res) => {
    let user = req.body;

    if (user.password && user.password !== user.confirmedPassword) {
        user.error = 'Passwords do not match.';
        res.render('users/register', user);
        return;
    }

    let salt = encryption.generateSalt();
    user.salt = salt;

    if (user.password) {
        let hashedPassword = encryption.generateHashedPassword(salt, user.password);
        user.password = hashedPassword;
    }

    User.create(user).then(user => {
        req.logIn(user, (error, user) => {
            if (error) {
                res.render('users/register', { error: 'Authentication not working!' });
                return;
            }

            res.redirect('/');
        })
    })
        .catch(error => {
            user.error = error;
            res.render('users/register', user);
        })
}

module.exports.loginGet = (req, res) => {
    res.render('users/login');
}

module.exports.loginPost = (req, res) => {
    let userToLogin = req.body;

    User.findOne({ username: userToLogin.username }).then(user => {
        if (!user || !user.authenticate(userToLogin.password)) {
            res.render('users/login', { error: 'Invalid credentials!' })
        }
        else {
            req.logIn(user, (error, user) => {
                if (error) {
                    res.render('users/login', { error: 'Authentication not working!' });
                    return;
                }

                res.redirect('/');
            })
        }
    })
}

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

module.exports.getProfile = (req, res) => {
    if (req.user) {
        User.findById(req.user._id).then(user => {
            let rentedCarsIds = user.rentedCars.map(c => c.carId);
            Car.find({ _id: { "$in": rentedCarsIds } }).then(cars => {
                let rentedCars = [];
                for (let index = 0; index < rentedCarsIds.length; index++) {
                    let currentCarId = rentedCarsIds[index];
                    let currentCar = cars.filter(el => el.id == currentCarId)[0];

                    let obj = {
                        make: currentCar.make,
                        model: currentCar.model,
                        duration: user.rentedCars[index].duration
                    }

                    rentedCars.push(obj);
                }
                res.render('users/profile', { username: user.username, rentedCars: rentedCars });
            });
        })
    } else {
        res.render('index', { error: 'Sorry, but first have to login.' });
    }

}
