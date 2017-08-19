// dependencies
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var hash = require('bcrypt-nodejs');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var connection = require('./utils/db.js');
var user = require('./models/user');
var middlewares = require('./middlewares/index');
// user schema/model
//var User = require('./models/user.js');

// create instance of express
var app = express();

middlewares(app, express, __dirname);
// require routes
var routes = require('./routes/api.js');

// define middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// configure passport
// passport.use(new localStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


var strategy = new LocalStrategy({
  usernameField: 'username',
  signertypeField: 'signertype',
    passwordField: 'password', passReqToCallback: true
}, function (req, username, password,signertype, next) {
  if (req.url.indexOf('admin') > -1) {
	  user.authenticateadmin(username, password, signertype).then(function (user) {
	    next(null, user);
	  }, function (error) {
	    next(error);
	  });
  }
  else {
    user.authenticate(username, password, signertype).then(function (user) {
      next(null, user);
    }, function (error) {
      next(error);
    });
  }
	  
});

passport.use(strategy);

passport.serializeUser(function (user, next) {
	if(user.phonenumber)
	  next(null, user.phonenumber);
	else next(null, user.username);
});


// used to deserialize the user
passport.deserializeUser(function (phonenumber, next) {
  user.findOne(phonenumber).then(function (auser) {
    next(null, auser);
  }, function (error) {
    next(error);
  });
});


// routes
app.use(routes);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// error hndlers
app.use(function (req, res, next) {
  var err = new Error('Not Found A');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

module.exports = app;
