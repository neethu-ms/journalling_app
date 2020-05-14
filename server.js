var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goalsRouter = require('./routes/goals');
var biodatasRouter = require('./routes/biodatas');
var userGoalsRouter = require('./routes/userGoals');
var userInsightRouter = require('./routes/userInsight');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var cookieSession = require('cookie-session');
var resetRouter = require('./routes/reset');

var app = express();
//cookie
app.use(
  cookieSession({
    name: "session",
    keys: ["12345A"]
  })
);

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/goals', goalsRouter);
app.use('/api/biodatas', biodatasRouter);
app.use('/api/userGoals', userGoalsRouter);
app.use('/api/userInsight', userInsightRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/db/reset', resetRouter);

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
 
});

module.exports = app;
