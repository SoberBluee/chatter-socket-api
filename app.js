var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
    origin: 'http://127.0.0.1:4200'
}));

app.use('/api/1.0', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/**
 * User logs onto their account
 * Goes to a user they want to talk to 
 * All their messages are stored in the database so use will be able to see their messages 
 * When user opens their chat log, first all messages are retrieved from the database 
 * through the media server.
 * Once messages are returned and displayed to the user
 * Another request is made to establish a a socket connection with that user
 * In that request, it will contain
 *  sender userId 
 *  recieved userId
 *  More information may be needed
 * 
*/
