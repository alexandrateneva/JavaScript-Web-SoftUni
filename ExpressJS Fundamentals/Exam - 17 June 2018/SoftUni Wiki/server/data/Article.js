const mongoose = require('mongoose');
const propertyIsRequired = '{0} is required.'

let articleSchema = mongoose.Schema({
    title: { type: String, required: propertyIsRequired.replace('{0}', 'Title') },
    lockedStatus: { type: Boolean, default: false },
    edits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article', default: [] }],
    creationDate: { type: Date, default: Date.now() },
});

let Article = mongoose.model('Article', articleSchema);

module.exports = Article;