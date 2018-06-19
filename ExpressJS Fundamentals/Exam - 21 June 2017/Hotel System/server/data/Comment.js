const mongoose = require('mongoose');
const propertyIsRequired = '{0} is required.'

let commentSchema = mongoose.Schema({
    title: {
        type: String,
        required: propertyIsRequired.replace('{0}', 'Title')
    },
    content: {
        type: String,
        required: propertyIsRequired.replace('{0}', 'Content')
    },
    date: {
        type: Date,
        default: Date.now()
    },
    creator: {
        type: String,
        required: propertyIsRequired.replace('{0}', 'Creator')
    },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
});

let Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;