const Car = require('../models/Car');
const User = require('../models/User');
const errMsgCreate = 'Sorry, but only admin can create a car.';
const errMsgEdit = 'Sorry, but only admin can edit a car.';
const errMsgLogin = 'Sorry, but first you have to login.';

module.exports = {
    getAddCar: (req, res) => {
        if (req.user && req.user.roles.indexOf('Admin') >= 0) {
            res.render('cars/create');
        } else {
            res.render('index', { error: errMsgCreate });
        }
    },
    postAddCar: (req, res) => {
        let carObj = req.body;

        if (req.user && req.user.roles.indexOf('Admin') >= 0) {
            Car.create(carObj).then(car => {
                res.render('cars/details', car);
            })
                .catch(error => {
                    res.render('cars/create', { error: error.message });
                })
        } else {
            res.render('cars/create', { error: errMsgCreate });
        }

    },
    getAllCars: (req, res) => {
        Car
            .find({})
            .then(cars => {
                cars.forEach(c => c.rentersCount = c.renters.length);

                if (req.user && req.user.roles.indexOf('Admin') >= 0) {
                    return res.render('cars/all', { cars, admin: true });
                }

                return res.render('cars/all', { cars, admin: false });
            })
    },
    getDetails: (req, res) => {
        let id = req.params.id;

        Car
            .findById(id)
            .then(car => {
                car.rentersCount = car.renters.length;
                res.render('cars/details', car);
            })
    },
    getEditCar: (req, res) => {
        if (req.user && req.user.roles.indexOf('Admin') >= 0) {
            let id = req.params.id;

            Car
                .findById(id)
                .then(car => {
                    res.render('cars/edit', { car });
                })
        } else {
            res.render('index', { error: errMsgEdit });
        }
    },
    postEditCar: (req, res) => {
        let id = req.params.id;
        let carObj = req.body;

        if (req.user && req.user.roles.indexOf('Admin') >= 0) {
            Car.findOneAndUpdate({ _id: id }, { runValidators: true }).then(car => {
                for (let prop in carObj) {
                    if (car[prop] !== carObj[prop]) {
                        car[prop] = carObj[prop];
                    }
                }
                car.save(function (err) {
                    if (err) {
                        return res.render('cars/edit', { car: car, error: err.message });
                    }
                    car.rentersCount = car.renters.length;
                    res.render('cars/details', car);
                });
            }).catch(error => {
                res.render('cars/edit', { car: car, error: error.message });
            })
        } else {
            res.render('index', { error: errMsgEdit });
        }
    },
    getRentCar: (req, res) => {
        let carId = req.params.id;

        Car.findById(carId).then(car => {
            res.render('cars/rent', { car });
        })
    },
    postRentCar: (req, res) => {
        let id = req.params.id;
        let carObj = req.body;        
        let userId = req.user._id;

        if (req.user && req.user.roles.indexOf('Admin') === -1) {
            Car.findOneAndUpdate({ _id: id },
                { $push: { renters: userId } })
                .then(car => {

                    if (req.body.duration === '') {
                        return res.render('cars/rent', { car: car, error: 'Duration is required!' });
                    }
                    let duration = Number(req.body.duration);

                    User.findOneAndUpdate({ _id: userId },
                        { $push: { rentedCars: { carId: id, duration: duration } } })
                        .then(user => {

                            car.isRented = true;
                            car.save();

                            user.save();

                            res.render('index', { success: 'Thank you for renting a car from us!' });
                        })
                }).catch(error => {
                    res.render('cars/rent', { car: carObj, error: error.message });
                })
        } else {
            res.render('users/login', { error: errMsgLogin });
        }
    }
}