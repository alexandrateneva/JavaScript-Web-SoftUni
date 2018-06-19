const env = 'development';
const express = require('express');
const database = require('./config/database');
const settings = require('./config/settings')[env];
const server = require('./config/server');
const routes = require('./config/routes');
const passport = require('./config/passport');

database(settings);

const app = express();

server(app);
routes(app);
passport();

const port = settings.port;

app.listen(port, () => console.log(`Listening on port ${port}...`));