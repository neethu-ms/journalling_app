var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goalsRouter = require('./routes/goals');
var biodatasRouter = require('./routes/biodatas');
var userGoalsRouter = require('./routes/userGoals');

var app = express();

// view engine setup


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/goals', goalsRouter);
app.use('/api/biodatas', biodatasRouter);
app.use('/api/userGoals', userGoalsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
console.log(err.status)
  // render the error page
  res.status(err.status || 500);
 
});

module.exports = app;
