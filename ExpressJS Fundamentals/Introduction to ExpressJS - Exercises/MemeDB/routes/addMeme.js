const express = require('express');
const router = express.Router();
const Genre = require('../models/GenreSchema');
const Meme = require('../models/MemeSchema');

/* GET users listing. */

router
  .get('/', function (req, res) {
    Genre.find({}).then(allGenres => {
      res.render('addMeme', { genres: allGenres });
    })
  })
  .post('/', function (req, res) {
    let file = req.files.meme;
    let memeObj = req.body;
    memeObj.memePath = `/memes/${file.name}`;

    file.mv(`public/memes/${file.name}`, (err) => {
      if (err) {
        console.log(err);
        return;
      }

      Meme.create(memeObj).then(meme => {
        Genre.findOne({ genreName: memeObj.genreSelect }).then(genre => {

          genre.memeList.push(meme._id);
          genre.save();

          res.redirect('/viewAllMemes');
        })
      })
    })
  });

module.exports = router;