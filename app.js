const express=require("express");
const pageRouter=require("./routes/pages");
// database connection file
var connection = require('./config/config');

var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
const bodyParser = require('body-parser');
const app=express();
// for body parser
app.use(express.urlencoded({extend:true}));

// server static files
app.use('/public',  express.static(__dirname + '/public'));


// template engine
app.set("views",__dirname+"/views");
app.set("view engine","ejs");

// flash message function
app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
// controller function 



//   routes
app.use(pageRouter);


// setting of server

app.listen(3000,function(){
 console.log("Serving demo app on port 3000");
});

//module.exports=app;