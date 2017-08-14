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
	  user.authenticate(username, password, signertype).then(function (user,  otherInfo) {
	    next(null, user);
	  }, function (error) {
	    next(error);
	  });
  }
  else {
    user.authenticate(username, password, signertype).then(function (user, otherinfo) {
      next(null, user);
    }, function (error) {
      next(error);
    });
  }
	  
});

passport.use(strategy);

passport.serializeUser(function (user, next) {
//console.log(user.phonenumber);
  next(null, user.phonenumber);
});


// used to deserialize the user
passport.deserializeUser(function (phonenumber, next) {
  user.findOne(phonenumber).then(function (auser) {
    next(null, auser);
  }, function (error) {
    next(error);
  });
});

/*passport.use(new LocalStrategy(
  function(email, password, done) { // callback with email and password from our form
    connection.query("SELECT * FROM customers where emailaddress = '" + email + "'",function(err,rows){
        if (err)
          return done(err);
        if (!rows.length) {
          return done(null, false); // req.flash is the way to set flashdata using connect-flash
        } 
  
        // if the user is found but the password is wrong
        if (!( rows[0].password == password))
            return done(null, false); // create the loginMessage and save it to session as flashdata
  
        // all is well, return successful user
        return done(null, rows[0]);			

  });
}));*/

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
