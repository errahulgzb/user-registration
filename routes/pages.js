const express=require("express");
const bodyParser = require('body-parser');
const router=express.Router();
const { check, validationResult } = require('express-validator');
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
	res.render('registration', {error: {}, page:'User Registration', menuId:'registration',fulldata:{}});
});


router.post('/userregistration', 
	// [
    check('username').not().isEmpty().withMessage('User Name field is required'),
    check('email').not().isEmpty().withMessage('Email Id field is required').isEmail().withMessage('Please enter a Valid Email'),
    check('password').not().isEmpty().withMessage('Password field is required'),
    check('password_confirm').not().isEmpty().withMessage('Confirm Password field is required'),
    
	// ],
	// function(req, res){
	// 	const errors = validationResult(req);
	// 	if(!errors.isEmpty()){
	// 		 res.render('registration', {fulldata:req.body,page:'User Registration', menuId:'registration', error: errors.mapped()});
	// 	}else{

		check('password_confirm').custom((value, { req }) => {
      return new Promise((resolve, reject) => {
      	var password=req.body.password;
      	var password_confirm=req.body.password_confirm;
      	if(password===password_confirm){
      		return resolve();
      	}else{
      		 return reject();
      	}
       
      });
   }).withMessage('confirm password doesnot match to password.'),
	  check('email').custom((value, { req }) => {
      return new Promise((resolve, reject) => {
      	 userController.findRepByEmail({ 'email': value }, (err, rep) => {
        	if(rep[0].count>0) {
        		//console.log(rep[0].count);
                return reject();
            } else {
            	//console.log("test");
                return resolve();
            }
        
         });
      });
   }).withMessage('This email is already in use'),
	function(req, res){
		const errors = validationResult(req);
		//console.log(errors);
		if(!errors.isEmpty()){
			//res.end();
			 res.render('registration', {fulldata:req.body,page:'User Registration', menuId:'registration', error: errors.mapped()});
		}else{
			userController.register(req,res);

		}	
	}
	
);

module.exports=router;