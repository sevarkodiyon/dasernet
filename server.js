#!/usr/bin/env node

//var debug = require('debug')('passport-mongo');
var app = require('./app');
var port =  process.env.PORT || 4001;
app.set('port',port);
var server = app.listen(port, function() {
  console.log('App listening on port !'+port);
});
