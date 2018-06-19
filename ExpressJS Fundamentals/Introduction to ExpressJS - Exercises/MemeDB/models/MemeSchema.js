const mongoose = require('mongoose');

let ObjectId = mongoose.Schema.Types.ObjectId;

let meme = new mongoose.Schema({
    memeName: { type: String, required: true },
    memePath: { type: String, required: true },
    memeDescription: {type: String},
    dateOfCreation: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Meme', meme);