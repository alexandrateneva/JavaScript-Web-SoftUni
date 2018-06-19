const mongoose = require('mongoose');
const propertyIsRequired = '{0} is required.'

let productSchema = mongoose.Schema({
    category: {
        type: String,
        enum: ['Beef', 'Chicken', 'Lamb'],
        required: propertyIsRequired.replace('{0}', 'Category')
    },
    imageUrl: {
        type: String,
        required: propertyIsRequired.replace('{0}', 'Image')
    },
    size: {
        type: Number,
        min: [17, 'Doner must be at least 17 cm.'],
        max: [24, 'Doner can be max 24 cm.'],
        required: propertyIsRequired.replace('{0}', 'Size')
    },
    toppings: [{
        type: String,
        enum: ['pickle', 'tomato', 'onion', 'lettuce', 'hot sauce', 'extra sauce']
    }]
});

let Product = mongoose.model('Product', productSchema);

module.exports = Product;