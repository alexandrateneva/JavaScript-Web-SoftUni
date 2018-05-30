const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
let movies = require('../config/database.json');

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname
    if (req.pathname === '/addMovie' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/addMovie.html'));

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
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.write(data);
            res.end();
        })
    } else if (req.pathname === '/addMovie' && req.method === 'POST') {
        let dataString = '';

        req.on('data', (data) => {
            dataString += data;
        });

        req.on('end', () => {
            let movie = qs.parse(dataString);
            let alreadyExist = movies.filter(m => m.movieTitle === movie.movieTitle);
            let emptyField = !movie.movieTitle || !movie.moviePoster;

            let filePath = path.normalize(path.join(__dirname, '../views/addMovie.html'));
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

                let content = "";
                if (emptyField) {
                    content += `<div id="errBox"><h2 id="errMsg">Please fill all fields.</h2></div>`;
                }
                else if (alreadyExist) {
                    content += `<div id="errBox"><h2 id="errMsg">This movie already exists in the database.</h2></div>`;
                } else {
                    content += `<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>`;

                    movies.push(movie);
                    fs.writeFileSync('./config/database.json', JSON.stringify(movies));
                }
                let html = data.toString().replace("{{replaceMe}}", content);

                res.writeHead(200, {
                    'Content-Type': 'text/html'
                })
                res.write(html);

                res.end();
            })
        })
    } else {
        return true;
    }
}