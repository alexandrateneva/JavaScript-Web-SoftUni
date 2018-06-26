const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const port = 9999;
let app = express();

let dbPathBioCollection = path.join(__dirname, '/db/bioDb.json');
let dbPathEpCollection = path.join(__dirname, '/db/epDb.json');

let bioCollection = fs.readFileSync(dbPathBioCollection);
let epCollection = fs.readFileSync(dbPathEpCollection);

epCollection = JSON.parse(epCollection.toString());
bioCollection = JSON.parse(bioCollection.toString());

app.use(cors());

app.get('/roster', (req, res) => {
    res.send(bioCollection);
})

app.get('/character/:id', (req, res) => {
    let targetElem = req.params.id;
    let target = bioCollection.find(x => {
        if (x.id == targetElem) {
            return x;
        }
    })
    res.send(JSON.stringify(target));
})

//Colection episodes

app.get('/episodePreview/:id', (req, res) => {
    let targetElem = req.params.id

    if (Number(targetElem) < 0) {
        targetElem = epCollection.length - 1;
    }
    if (Number(targetElem) >= epCollection.length) {
        targetElem = 0;
    }
    let target = epCollection.find(x => {
        if (x.id == targetElem) {
            return x;
        }
    })

    res.send(JSON.stringify(target));
})

app.listen(port);
console.log(`Listening on port ${port}...`);