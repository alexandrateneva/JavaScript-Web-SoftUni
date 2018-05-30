const homeHandler = require('./home');
const filesHandler = require('./static-files');
const allMoviesHandler = require('./allMovies');
const movieDetailsHandler = require('./movieDetails');
const addMovieHandler = require('./addMovie');
const statusHandler = require('./status');

module.exports = [homeHandler, filesHandler, allMoviesHandler, movieDetailsHandler, addMovieHandler, statusHandler];