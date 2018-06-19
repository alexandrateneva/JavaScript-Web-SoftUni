const mongoose = require('mongoose');
const propertyIsRequired = '{0} is required.'

let categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: propertyIsRequired.replace('{0}', 'Name')
    },
    hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', default: [] }]
});

let Category = mongoose.model('Category', categorySchema);

module.exports = Category;