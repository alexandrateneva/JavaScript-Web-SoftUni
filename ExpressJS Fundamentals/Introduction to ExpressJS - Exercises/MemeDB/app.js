const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const bodyParser = require('body-parser');
const fileUploader = require('express-fileupload');

const indexRouter = require('./routes/index');
const addMemeRouter = require('./routes/addMeme');
const addGenreRouter = require('./routes/addGenre');
const viewAllMemesRouter = require('./routes/viewAllMemes');
const searchMemeRouter = require('./routes/searchMeme');
const viewDetailsRouter = require('./routes/viewDetails');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUploader());

app.use('/', indexRouter);
app.use('/addGenre', addGenreRouter);
app.use('/addMeme', addMemeRouter);
app.use('/viewAllMemes', viewAllMemesRouter);
app.use('/searchMeme', searchMemeRouter);
app.use('/getDetails', viewDetailsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in developboent
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;