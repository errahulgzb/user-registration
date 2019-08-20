const express=require("express");
const pageRouter=require("./routes/pages");
// database connection file
var connection = require('./config/config');

var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('req-flash');
//var flash = require('connect-flash');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app=express();
// for body parser


// server static files
app.use('/public',  express.static(__dirname + '/public'));


// template engine
app.set("views",__dirname+"/views");
app.set("view engine","ejs");



// app.use(cookieParser('secret'));
// app.use(session({cookie: { maxAge: 60000 }}));
//app.use(flash());
//app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
//app.use(bodyParser.json()); // parse application/json
// controller function 
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json


//   routes
//app.use(expressValidator());
app.use(pageRouter);


// setting of server

app.listen(3000,function(){
 console.log("Serving demo app on port 3000");
});

//module.exports=app;