const mongoose = require('mongoose');

let imageSchema = mongoose.Schema({
    imageUrl: { type: String, required: true, unique: true },
    title: {type: String},
    creationDate: { type: Date, require: true },
    description: { type: String },
    tags: [{ type: mongoose.Schema.ObjectId, ref: 'TagSchema' }]
})

let Image = mongoose.model('Image', imageSchema);

module.exports = Image;