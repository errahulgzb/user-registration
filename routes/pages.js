const express=require("express");
const bodyParser = require('body-parser');
const router=express.Router();
// controllers include 
var userController=require('./../controllers/user-controller');

// get into index page

router.get("/",function(req,res){
	res.render('index', {page:'Home', menuId:'home'});
});
router.get("/about",function(req,res){
	res.render('aboutus', {page:'About Us', menuId:'aboutus'});
});
router.get("/registration",function(req,res){
	req.flash("success", "");
	res.render('registration', {page:'User Registration', menuId:'registration'});
});


router.post('/userregistration', userController.register);

module.exports=router;