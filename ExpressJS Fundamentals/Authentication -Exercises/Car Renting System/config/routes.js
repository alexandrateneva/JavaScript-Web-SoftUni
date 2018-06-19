const homeController = require('../controllers/home-controller');
const userController = require('../controllers/user-controller');
const carController = require('../controllers/cars-controller');

module.exports = (app) => {
    app.get('/', homeController.getIndex);

    app.get('/users/register', userController.registerGet);
    app.post('/users/register', userController.registerPost);

    app.get('/users/login', userController.loginGet);
    app.post('/users/login', userController.loginPost);

    app.get('/users/logout', userController.logout);

    app.get('/users/profile/me', userController.getProfile);

    app.get('/cars/create', carController.getAddCar);
    app.post('/cars/create', carController.postAddCar);

    app.get('/cars/all', carController.getAllCars);

    app.get('/cars/details/:id', carController.getDetails);

    app.get('/cars/edit/:id', carController.getEditCar);
    app.post('/cars/edit/:id', carController.postEditCar);

    app.get('/cars/rent/:id', carController.getRentCar);
    app.post('/cars/rent/:id', carController.postRentCar);
}