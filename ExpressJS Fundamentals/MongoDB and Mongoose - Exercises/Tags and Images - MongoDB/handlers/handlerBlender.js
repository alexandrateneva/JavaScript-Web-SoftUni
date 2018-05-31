const homeHandler = require('./homeHandler');
const imageHandler = require('./imageHandler');
const addTagHandler = require('./tagHandler');
const searchHandler = require('./searchHandler');
const staticFileHandler = require('./staticHandler');

module.exports = [homeHandler, addTagHandler, searchHandler, imageHandler, staticFileHandler];