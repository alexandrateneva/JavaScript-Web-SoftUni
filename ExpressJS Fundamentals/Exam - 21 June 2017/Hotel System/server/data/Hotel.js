const mongoose = require('mongoose');
const propertyIsRequired = '{0} is required.'

let hotelSchema = mongoose.Schema({
    title: {
        type: String,
        required: propertyIsRequired.replace('{0}', 'Title')
    },
    imageUrl: {
        type: String,
        required: propertyIsRequired.replace('{0}', 'Image')
    },
    description: {
        type: String
    },
    location: {
        type: String,
        required: propertyIsRequired.replace('{0}', 'Location')
    },
    category: {
        type: String,
        required: propertyIsRequired.replace('{0}', 'Category')
    },
    date: {
        type: Date,
        default: Date.now()
    },
    creator: {
        type: String,
        required: true
    },
    likes: [{
        type: String
    }],
    views: {
        type: Number,
        default: 0
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: [] }]
});

let Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;