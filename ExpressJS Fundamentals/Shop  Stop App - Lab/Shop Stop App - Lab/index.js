const port = 3000;
const config = require('./config/config');
const database = require('./config/database.config');
const express = require('express');
const server = require('./config/express');
const routes = require('./config/routes');
const passport = require('./config/passport');

let app = express();
let enviroment = process.env.NODE_ENV || 'development';

database(config[enviroment]);
server(app, config[enviroment]);
routes(app);
passport();

app.listen(port);