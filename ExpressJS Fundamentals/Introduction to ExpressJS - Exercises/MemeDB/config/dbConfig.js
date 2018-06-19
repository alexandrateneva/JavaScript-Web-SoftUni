const mongoose = require('mongoose');
const path = 'mongodb://localhost:27017/MemeDB';

mongoose.Promise = global.Promise;

module.exports = (() => {
    mongoose.connect(path);
    console.log('Successfully connected to the database.')
})();