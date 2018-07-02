var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser=require('body-parser');

var indexRouter = require('./routes/index');
var movieRouter = require('./routes/movies');
var directorRouter = require('./routes/directors');


var app = express();
const db=require('./helper/db.js')();

const config=require('./config');
app.set('api_secret_key',config.api_secret_key);


const verifyToken=require('./middleware/verify-token')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api',verifyToken);
app.use('/api/movies', movieRouter);
app.use('/api/directors', directorRouter);

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
  res.json({error:err.message, code:err.code});
});

module.exports = app;
