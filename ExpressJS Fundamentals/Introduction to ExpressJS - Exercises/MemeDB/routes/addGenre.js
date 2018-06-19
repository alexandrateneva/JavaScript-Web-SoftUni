const express = require('express');
const router = express.Router();
const Genre = require('../models/GenreSchema');

/* GET users listing. */

router
  .get('/', function (req, res) {
    res.render('addGenre');
  })
  .post('/', function (req, res) {
    let genre = req.body;

    Genre.find({ genreName: genre.genreName }).then(genres => {
      if (genres.length > 0) {
        res.render('addGenre', { alreadyExists: true });
      }
      else {
        Genre.create(genre).then(() => {
          res.render('addGenre', { isAdded: true });
        })
      }
    })
  })

module.exports = router;