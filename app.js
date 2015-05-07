var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var sequelize = new Sequelize('linkit', 'linkit', 'linkit');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

Link = sequelize.define('Link', {
    title: Sequelize.STRING,
    url: Sequelize.STRING
},{
    tableName: "links"
});

User = sequelize.define('User', {
    name: Sequelize.STRING,
    password: Sequelize.STRING
},{
    tableName: "users"
});
Link.belongsTo(User);

Vote = sequelize.define('Vote', {
    upvote: Sequelize.BOOLEAN
},{
    tableName: "votes"
});
Vote.belongsTo(User);
Vote.belongsTo(Link);
User.hasMany(Vote);
Link.hasMany(Vote);

module.exports = app;
