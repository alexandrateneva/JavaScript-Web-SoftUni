const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const Tag = require('../models/TagSchema');
const Image = require('../models/ImageSchema');

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res);
  } else if (req.pathname.startsWith('/delete') && req.method === 'GET') {
    deleteImage(req, res);
  } else {
    return true;
  }
}

function addImage(req, res) {

  let dataString = '';
  req.on('data', (data) => {
    dataString += data;
  });

  req.on('end', () => {
    let image = qs.parse(dataString);
    image.creationDate = Date.now();
    if (image.tags === '') {
      image.tags = [];
    } else {
      image.tags = image.tags.split(',').filter(t => t !== '');
    }

    Tag.find({ name: { "$in": image.tags } }).then(tags => {
      image.tags = [];
      tags.forEach(tag => {
        image.tags.push(tag._id);
      });

      Image.create(image).then((insertedImage) => {

        tags.forEach(tag => {
          tag.images.push(insertedImage._id);
          tag.save();
        });

        res.writeHead(302, {
          'Location': '/'
        })
        res.end();
      })
    })
  })
}

function deleteImage(req, res) {
  let imageId = req.url.split('=')[1];

  Image.findByIdAndRemove(imageId).then(() => {

    res.writeHead(302, {
      'Location': '/'
    })
    res.end();
  })
}