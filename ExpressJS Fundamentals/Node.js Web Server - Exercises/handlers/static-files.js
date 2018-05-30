const fs = require('fs');
const path = require('path');
const url = require('url');

function getContentType(url) {
    let ending = url.split('.').pop();
    let types = {
        'css': 'text/css',
        'ico': 'image/x-icon',
        'jpeg': 'image/jpeg',
        'jpg': 'image/jpeg',
        'png': 'image/png'
    };

    return types[ending];
}

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname.startsWith('/public/') && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, `..${req.pathname}`));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                })

                res.write('Resource not found!');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': getContentType(req.pathname)
            })
            res.write(data);
            res.end();
        })
    } else {
        return true;
    }
}