const express=require("express");
const bodyParser = require('body-parser');
const router=express.Router();

// get into index page

router.get("/",function(req,res){
	res.render('index', {page:'Home', menuId:'home'});
});
router.get("/about",function(req,res){
	res.render('aboutus', {page:'About Us', menuId:'aboutus'});
});

module.exports=router;