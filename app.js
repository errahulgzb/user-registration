const express=require("express");
const app=express();
const pageRouter=require("./routes/pages");

// for body parser
app.use(express.urlencoded({extend:true}));

// server static files
app.use('/public',  express.static(__dirname + '/public'));


// template engine
app.set("views",__dirname+"/views");
app.set("view engine","ejs");



//   routes
app.use(pageRouter);


// setting of server

app.listen(3000,function(){
 console.log("Serving demo app on port 3000");
});

//module.exports=app;