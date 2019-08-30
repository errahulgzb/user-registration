const express=require("express");
const bodyParser = require('body-parser');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('secretKeys');
const router=express.Router();
const { check, validationResult } = require('express-validator');
// multer script start here
var multer  = require('multer');
var path = require("path");
var upload = multer({ dest: path.join('public', "./uploads/") });
var fs = require("fs");
// controllers include 
var userController=require('./../controllers/user-controller');
// passport script
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

passport.use(new Strategy({usernameField:"email", passwordField:"password"},
  function(usernameField, passwordField, cb) {
   
    userController.findByEmail(usernameField, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (cryptr.decrypt(user[0].password) != passwordField) { return cb(null, false); }


      return cb(null, user);
    });
  }));

passport.serializeUser(function(user, cb) {
  //console.log(user[0].id);
  cb(null, user[0].id);
});

passport.deserializeUser(function(uid, cb) {
  
  userController.findById(uid, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// passport script end


// get into index page

router.get("/",function(req,res){
 var loggedin=userdetail={};
  if(req.user){
    loggedin=1;
    userdetail=req.user;
  }
	res.render('index', {sessionUser:loggedin,userdetail:userdetail,page:'Home', menuId:'home',successMsg: req.flash('successMsg'),errorMsg: req.flash('errorMsg')});
});
// get into about us page
router.get("/about",function(req,res){
 var loggedin=userdetail={};
  if(req.user){
    loggedin=1;
    userdetail=req.user;
  }
	res.render('aboutus', {sessionUser:loggedin,userdetail:userdetail,page:'About Us', menuId:'aboutus'});
});

// get into login page
router.get("/login",function(req,res){
  var loggedin=userdetail={};
  if(req.user){
    loggedin=1;
    userdetail=req.user;
  }
	res.render('login', {sessionUser:loggedin,userdetail:userdetail,page:'Login', menuId:'login',error: {},successMsg: req.flash('successMsg'),errorMsg: req.flash('errorMsg')});
});

// get into login action 
router.post('/login', 
    check('email').not().isEmpty().withMessage('Email Id field is required').isEmail().withMessage('Please enter a Valid Email'),
    check('password').not().isEmpty().withMessage('Password field is required'),

    function(req, res){
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        var loggedin={};
        if(req.user){
        loggedin=1;
        }
       res.render('login', {sessionUser:loggedin,page:'Login', menuId:'login',error: errors.mapped(),successMsg: req.flash('successMsg'),errorMsg: req.flash('errorMsg')});
     }else{
       userController.login(req,function(err,result){
       
        if(err==1){
           req.flash('errorMsg', 'you are entered wrong password!.');
           return res.redirect("login"); 
        }else if(err==2){
           req.flash('errorMsg', 'Email Id doesnot exist!.');
           return res.redirect("login"); 
        }else if(err==3){
           req.flash('errorMsg', 'Some thing wrong with query!.');
           return res.redirect("login"); 
        }else{ 

          passport.authenticate('local', {successRedirect:'/profile',failureRedirect: '/login',failureFlash : true})(req,res);
        }
       });
    }
  }
);
// get into logout page
router.get('/logout', function(req, res){
  req.logout();
  req.flash('successMsg', 'you are successfully logout!');
  res.redirect('/');
});

// get into authentication 
function isAuthenticated(req, res, next) {
  // do any checks you want to in here

  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  if (req.user)
      return next();
// IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect('/login');
}

// get into profile page
router.get("/profile",isAuthenticated,function(req,res){
  //console.log(req.user);
  var loggedin=userdetail={};
  if(req.user){
    loggedin=1;
    userdetail=JSON.parse(JSON.stringify(req.user));
  }
  res.render('profile', {page:'User Profile', sessionUser:loggedin,menuId:'User profile',userdetail:userdetail});
});

// get to edit profile page
router.get("/editprofile",isAuthenticated,function(req,res){
  console.log(req.user);
  var loggedin=userdetail={};
  if(req.user){
    loggedin=1;
    userdetail=JSON.parse(JSON.stringify(req.user));
  }
  res.render('editprofile', {page:'Edit Profile', error:{},sessionUser:loggedin,menuId:'Edit profile',userdetail:userdetail});
});

// get to edit profile action 
const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

router.post("/editprofile",
  upload.single("profile_img"),
  check('username').not().isEmpty().withMessage("User Name field is required"),
 function(req,res,next){
    const errors=validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
      var loggedin=userdetail={};
      if(req.user){
      loggedin=1;
      userdetail=JSON.parse(JSON.stringify(req.user));
      }
      res.render('editprofile', {sessionUser:loggedin,userdetail:userdetail,fulldata:req.body,page:'Edit profile', menuId:'editprofile', error: errors.mapped()});
    }else{
     // console.log("");
      if(req.file){
            const tempPath = req.file.path;
            console.log(tempPath);
            console.log(req.file.originalname);
            const targetPath = path.join('public', "./uploads/"+req.file.originalname);
            fs.rename(tempPath, targetPath, err => {
              if (err) return handleError(err, res);

            });
          }
      userController.updateprofile(req,res);
      }
    }
  );


// get into user registration page
router.get("/userregistration",function(req,res){
  var loggedin=userdetail={};

  if(req.user){
    loggedin=1;
    userdetail=req.user;
  }

	res.render('registration', {sessionUser:loggedin,userdetail:userdetail,error: {}, page:'User Registration', menuId:'registration',fulldata:{},successMsg: req.flash('successMsg'),errorMsg: req.flash('errorMsg')});
});

// get into user registration action 
router.post('/userregistration', 
	  check('username').not().isEmpty().withMessage('User Name field is required'),
    check('email').not().isEmpty().withMessage('Email Id field is required').isEmail().withMessage('Please enter a Valid Email'),
    check('password').not().isEmpty().withMessage('Password field is required'),
    check('password_confirm').not().isEmpty().withMessage('Confirm Password field is required'),
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
      var loggedin=userdetail={};
      if(req.user){
      loggedin=1;
      userdetail=req.user;
      }
			//res.end();
			 res.render('registration', {sessionUser:loggedin,userdetail:userdetail,fulldata:req.body,page:'User Registration', menuId:'registration', error: errors.mapped()});
		}else{
			userController.register(req,res);

		}	
	}
	
);

module.exports=router;