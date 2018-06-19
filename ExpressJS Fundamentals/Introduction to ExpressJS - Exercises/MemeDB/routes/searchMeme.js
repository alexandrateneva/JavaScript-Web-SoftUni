const express = require('express');
const router = express.Router();
const Genre = require('../models/GenreSchema');
const Meme = require('../models/MemeSchema');

/* GET users listing. */

router
  .get('/', function (req, res) {
    Genre.find({}).then(allGenres => {
      res.render('searchMeme', { genres: allGenres });
    })
  })
  .post('/', function (req, res) {
    let genreName = req.body.genreSelect;
    let memeName = req.body.memeName;

    if (genreName === 'All') {
      Meme.find({ memeName: memeName }).then(memes => {
        renderHtml(res, memes);
      })
    } else {
      Genre.findOne({ genreName: genreName })
        .populate('memeList')
        .then(genre => {
          let memes = genre.memeList.filter(m => m.memeName === memeName);
          renderHtml(res, memes);
        })
    }
  });

function renderHtml(res, memes) {
  console.log(memes.length);
  if (memes.length === 0) {
    res.render('viewAllMemes', { noData: true });
  } else {
    res.render('viewAllMemes', { memes: memes });
  }
}

module.exports = router;