const mongoose = require('mongoose');

let categoryScheme = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: mongoose.Schema.ObjectId, ref: 'Product' }]
})

let Category = mongoose.model('Category', categoryScheme);

module.exports = Category;