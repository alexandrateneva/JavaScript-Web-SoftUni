const handlebars = require('express-handlebars');
const express = require('express');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.engine('hbs', handlebars({
        extname: '.hbs',
        layoutsDir: 'views',
        defaultLayout: 'layout'
    }))

    app.set('view engine', 'hbs');

    app.use(express.static('content'));
    app.use(bodyParser.urlencoded({ extended: true }));
}