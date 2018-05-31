const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const Tag = require('../models/TagSchema');
const Image = require('../models/ImageSchema');

module.exports = (req, res) => {
  if (req.pathname === '/search' && req.method === 'POST') {
    let dataString = '';
    req.on('data', (data) => {
      dataString += data;
    });

    req.on('end', () => {
      let search = qs.parse(dataString);
      let limit = (search.limit === '') ? 10 : Number(search.limit);

      fs.readFile('./views/results.html', (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        res.writeHead(200, {
          'Content-Type': 'text/html'
        })

        let content = '';

        if (search.tagName === '' && search.afterDate === '' && search.beforeDate === '') {

          Image.find({}).limit(limit).then(images => {
            for (let image of images) {
              content += `<fieldset id => <legend>${image.title}:</legend> 
              <img src="${image.imageUrl}">
              </img><p>${image.description}<p/>
              <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
              </button> 
              </fieldset>`;
            }
            data = data
              .toString()
              .replace(`<div class='replaceMe'></div>`, content)
            res.end(data)
          })
        }
        else if (search.tagName !== '' && search.beforeDate === '' && search.afterDate === '') {
          let tagName = search.tagName;

          Tag.findOne({ name: tagName }).then(tag => {
            if (tag === null) {
              data = data
                .toString()
                .replace(`<div class='replaceMe'></div>`, 'No records were found that match the specified search criteria.');
              res.end(data);
              return;
            }

            let tagId = tag._id;
            let imgIds = tag.images;

            Image.find({
              _id: { "$in": imgIds }
            })
              .limit(limit)
              .then(images => {
                for (let image of images) {
                  content += `<fieldset id => <legend>${image.title}:</legend> 
                <img src="${image.imageUrl}">
                </img><p>${image.description}<p/>
                <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
                </button> 
                </fieldset>`;
                }

                if (content === '') {
                  content = 'No records were found that match the specified search criteria.';
                }
                data = data
                  .toString()
                  .replace(`<div class='replaceMe'></div>`, content)
                res.end(data);
              })
          })
        }
        else if (search.tagName === '' && search.beforeDate !== '' && search.afterDate !== '') {

          let afterDate = (search.afterDate === '') ? new Date('2018-01-01') : new Date(search.afterDate);
          let beforeDate = (search.beforeDate === '') ? new Date(Date.now()) : new Date(search.beforeDate);

          Image.find({
            creationDate: { "$gte": afterDate, "$lt": beforeDate }
          })
            .limit(limit)
            .then(images => {
              for (let image of images) {
                content += `<fieldset id => <legend>${image.title}:</legend> 
                <img src="${image.imageUrl}">
                </img><p>${image.description}<p/>
                <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
                </button> 
                </fieldset>`;
              }

              if (content === '') {
                content = 'No records were found that match the specified search criteria.';
              }
              data = data
                .toString()
                .replace(`<div class='replaceMe'></div>`, content)
              res.end(data);
            })
        }
        else {
          let afterDate = (search.afterDate === '') ? new Date('2018-01-01') : new Date(search.afterDate);
          let beforeDate = (search.beforeDate === '') ? new Date(Date.now()) : new Date(search.beforeDate);
          let tagName = search.tagName;

          Tag.findOne({ name: tagName }).then(tag => {
            if (tag === null) {
              data = data
                .toString()
                .replace(`<div class='replaceMe'></div>`, 'No records were found that match the specified search criteria.');
              res.end(data);
              return;
            }

            let tagId = tag._id;
            let imgIds = tag.images;

            Image.find({
              _id: { "$in": imgIds },
              creationDate: { "$gte": afterDate, "$lt": beforeDate }
            })
              .limit(limit)
              .then(images => {
                for (let image of images) {
                  content += `<fieldset id => <legend>${image.title}:</legend> 
                <img src="${image.imageUrl}">
                </img><p>${image.description}<p/>
                <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
                </button> 
                </fieldset>`;
                }

                if (content === '') {
                  content = 'No records were found that match the specified search criteria.';
                }
                data = data
                  .toString()
                  .replace(`<div class='replaceMe'></div>`, content)
                res.end(data);
              })
          })
        }
      })
    })
  } else {
    return true
  }
}