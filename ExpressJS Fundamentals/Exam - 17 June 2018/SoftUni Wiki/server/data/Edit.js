const mongoose = require('mongoose');
const propertyIsRequired = '{0} is required.'

let editSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    creationDate: { type: Date, default: Date.now() },
    content: { type: String, required: propertyIsRequired.replace('{0}', 'Content') }
});

let Edit = mongoose.model('Edit', editSchema);

module.exports = Edit;