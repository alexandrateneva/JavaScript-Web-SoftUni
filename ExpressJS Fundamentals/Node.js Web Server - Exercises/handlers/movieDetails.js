const url = require('url');
const fs = require('fs');
const path = require('path');
const movies = require('../config/database.json');

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname
    if (req.pathname.startsWith('/details/') && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/details.html'));

        fs.readFile(filePath, 'ascii', (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                })

                res.write('404 not found!');
                res.end();
                return;
            }
            let title = req.pathname.split('/').pop();
            let movie = movies.filter(m => decode(m.movieTitle) === decode(title))[0];

            let content = `<div class="content">
            <img src="${decodeURIComponent(movie.moviePoster)}" alt=""/>
            <h3>Title  ${decode(movie.movieTitle)}</h3>
            <h3>Year ${movie.movieYear}</h3>
            <p> ${decode(movie.movieDescription)}</p>
            </div>`;
            
            let html = data.toString().replace('<div id="replaceMe">{replaceMe}</div>', content);

            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.write(html);
            res.end();
        })
    } else {
        return true;
    }
}

function decode(text){
    return unescape(text).replace(/\+/g,' ');
}