const url = require('url');
const fs = require('fs');
const path = require('path');
const database = require('../config/database.json');

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname
    if (req.pathname === '/viewAllMovies' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/viewAll.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                })

                res.write('404 not found!');
                res.end();
                return;
            }

            let content = '';
            for (let movie of database) {
                let poster = decodeURIComponent(movie.moviePoster);
                content += `<a href="/details/${movie.movieTitle}">
                <div class="movie">
                <img class="moviePoster" src="${poster}"/>          
                </div></a>`
            }

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