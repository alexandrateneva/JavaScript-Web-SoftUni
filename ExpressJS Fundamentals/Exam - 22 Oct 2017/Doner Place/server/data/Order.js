const mongoose = require('mongoose');
const propertyIsRequired = '{0} is required.'

let OrderSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'In Transit', 'Delivered'],
        default: 'Pending'
    },
    toppings: [{
        type: String,
        enum: ['pickle', 'tomato', 'onion', 'lettuce', 'hot sauce', 'extra sauce']
    }],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
});

let Order = mongoose.model('Order', OrderSchema);

module.exports = Order;