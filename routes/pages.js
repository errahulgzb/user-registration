const express=require("express");
const bodyParser = require('body-parser');
const router=express.Router();
const { check, validationResult } = require('express-validator');
const { matchedData } = require('express-validator');
// controllers include 
var userController=require('./../controllers/user-controller');

// get into index page

router.get("/",function(req,res){
	res.render('index', {page:'Home', menuId:'home'});
});
router.get("/about",function(req,res){
	res.render('aboutus', {page:'About Us', menuId:'aboutus'});
});
router.get("/userregistration",function(req,res){
	
	res.render('registration', {error: {}, page:'User Registration', menuId:'registration'});
});


router.post('/userregistration', 
	[
    check('username').not().isEmpty().withMessage('User Name field is required'),
    
	],
	function(req, res, next){
		const errors = validationResult(req);

    	const allData = matchedData(req);
		if(!errors.isEmpty()){
			console.log(errors);
			 res.render('registration', {matchedData:allData, page:'User Registration', menuId:'registration', error: errors.mapped()});
		}else{
			userController.register;
		}	
	}
	
);

module.exports=router;