const express=require("express");
const bodyParser = require('body-parser');
const router=express.Router();

// get into index page

router.get("/",function(req,res){
	 // res.render('index', { title: 'Express' });
	  res.render('index', {page:'Home', menuId:'home'});
	///res.render("index");
});

module.exports=router;