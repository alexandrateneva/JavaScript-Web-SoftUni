const express = require('express');
const router = express.Router();
const Meme = require('../models/MemeSchema');

/* GET users listing. */

router.get('/', function (req, res) {

  Meme.find({}).then(allMemes => {
    res.render('viewAllMemes', {memes: allMemes});
  })
})

module.exports = router;