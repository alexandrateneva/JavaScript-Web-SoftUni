const mongoose = require('mongoose');

let tagSchema = mongoose.Schema({
    name: { type: String, required: true },
    creationDate: { type: Date, require: true },
    images: [{ type: mongoose.Schema.ObjectId, ref: 'ImageSchema' }]
})

tagSchema.methods.getTagName = function () {
    return this.name.toLowerCase();
}

let Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
