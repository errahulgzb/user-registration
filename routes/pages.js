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
 //    check('username').not().isEmpty().withMessage('User Name field is required'),
 //    check('email').not().isEmpty().withMessage('Email Id field is required'),
 //    check('password').not().isEmpty().withMessage('Password field is required'),
 //    check('password_confirm').not().isEmpty().withMessage('Confirm Password field is required'),
    
	// ],
	// function(req, res){
	// 	const errors = validationResult(req);
	// 	if(!errors.isEmpty()){
	// 		 res.render('registration', {fulldata:req.body,page:'User Registration', menuId:'registration', error: errors.mapped()});
	// 	}else{
		check('email').custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        userController.findRepByEmail({ 'email': value }, (err, rep) => {
            if(req.params.rep_id){
              return resolve();
            }else{
            if(rep[0].count > 0) {
                return reject();
            } else {
                return resolve();
            }
          }
         });
      });
   }).withMessage('This email is already in use'),

	userController.register
	// 	}	
	// }
	
);

module.exports=router;