const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const Tag = require('../models/TagSchema');
const Image = require('../models/ImageSchema');

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname
  if (req.pathname === '/generateTag' && req.method === 'POST') {

    let dataString = '';
    req.on('data', (data) => {
      dataString += data;
    });

    req.on('end', () => {
      let tag = qs.parse(dataString);
      tag.creationDate = Date.now();

      Tag.find({ name: tag.name }).then(tags => {

        if (tags.length > 0) {
          res.writeHead(302, {
            'Location': '/'
          })
          res.end();
          return;
        }

        Tag.create(tag).then(() => {
          res.writeHead(302, {
            'Location': '/'
          })
          res.end();
        })
      })
    })
  }
  else {
        return true;
      }
}
