const mongoose = require('mongoose');
const propertyIsRequired = '{0} is required.'

let carSchema = mongoose.Schema({
    make: {
        type: String,
        required: propertyIsRequired.replace('{0}', 'Make')
    },
    model: {
        type: String,
        required: propertyIsRequired.replace('{0}', 'Model')
    },
    description: {
        type: String
    },
    pricePerDay: {
        type: Number,
        required: propertyIsRequired.replace('{0}', 'Price per day'),
        min: 0,
        max: Number.MAX_VALUE
    },
    imageUrl: {
        type: String,
        required: propertyIsRequired.replace('{0}', 'Image')
    },
    color: {
        type: String
    },
    isRented: {
        type: Boolean,
        default: false
    },
    renters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default:[] }]
});

let Car = mongoose.model('Car', carSchema);

module.exports = Car;