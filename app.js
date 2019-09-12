const express=require("express");
const pageRouter=require("./routes/pages");
// database connection file
var connection = require('./config/config');

var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
// passport script
var passport          = require('passport');
var LocalStrategy     = require('passport-local').Strategy;

// var BetterMemoryStore = require(__dirname + '/memory');
// var store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });
const app=express();

// for date format
app.locals.moment = require('moment');
// server static files
app.use('/public',  express.static(__dirname + '/public'));


// template engine
app.set("views",__dirname+"/views");
app.set("view engine","ejs");


// for flash message script
app.use(session({ cookie: { maxAge: 1000000000 }, 
                  secret: 'woot',
                  resave: true, 
                  saveUninitialized: false}));
app.use(flash());
// passport script
app.use(passport.initialize());
app.use(passport.session());

// controller function 
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json

//   routes
app.use(pageRouter);


// setting of server

app.listen(4000,function(){
 console.log("Serving demo app on port 4000");
});

//module.exports=app;