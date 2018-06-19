const express = require('express');
const router = express.Router();
const Meme = require('../models/MemeSchema');

/* GET users listing. */

router.get('/:id', function (req, res) {
    let id = req.params.id;

    Meme.findById(id).then(meme => {
        res.render('viewDetails', { meme: meme });
    })
})

module.exports = router;