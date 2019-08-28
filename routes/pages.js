const express=require("express");
const bodyParser = require('body-parser');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('secretKeys');
const router=express.Router();
const { check, validationResult } = require('express-validator');
// controllers include 
var userController=require('./../controllers/user-controller');
// passport script
var passport = require('passport');
var Strategy = require('passport-local').Strategy;


passport.use(new Strategy({usernameField:"email", passwordField:"password"},
  function(usernameField, passwordField, cb) {
   
    userController.findByEmail(usernameField, function(err, user) {
      //console.log(user[0].password);
      //console.log('Hello');
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (cryptr.decrypt(user[0].password) != passwordField) { return cb(null, false); }


      return cb(null, user);
    });
  }));

passport.serializeUser(function(user, cb) {
  console.log(user[0].id);
  cb(null, user[0].id);
});

passport.deserializeUser(function(uid, cb) {
  
  userController.findById(uid, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// get into index page

router.get("/",function(req,res){
  console.log(req.user);
	res.render('index', {page:'Home', menuId:'home'});
});
router.get("/about",function(req,res){
	res.render('aboutus', {page:'About Us', menuId:'aboutus'});
});

router.get("/login",function(req,res){
  var loggedin={};
  if(req.user){
    loggedin=1;
  }
	res.render('login', {sessionUser:loggedin,page:'Login', menuId:'login',error: {},successMsg: req.flash('successMsg'),errorMsg: req.flash('errorMsg')});
});






router.post('/login', 
passport.authenticate('local', {failureRedirect: '/login'}),
function(req, res){
    res.redirect("profile");  
//console.log(req.user);
//res.render('profile', {page:'User Profile', menuId:'User profile'});
});



// router.post("/login", 
//   check('email').not().isEmpty().withMessage('Email Id field is required').isEmail().withMessage('Please enter a Valid Email'),
//   check('password').not().isEmpty().withMessage('Password field is required'),
// function(req, res){
//     const errors = validationResult(req);
//     //console.log(errors);
//     if(!errors.isEmpty()){
//       //res.end();
//        res.render('login', {page:'Login', menuId:'login',error: errors.mapped(),successMsg: req.flash('successMsg'),errorMsg: req.flash('errorMsg')});
//     }else{

//     passport.use('local', new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true //passback entire req to call back
//     } , function (req, email, password, done){
//     if(!email || !password ) {
//        req.flash('message','All fields are required.');
//       return res.redirect("login"); 
//      //return done(null, false, req.flash('message','All fields are required.')); 
//      }
    
//     // connection.query("select * from tbl_users where username = ?", [username], function(err, rows){
//     //   console.log(err); console.log(rows);
//     // if (err) return done(req.flash('message',err));
//     // if(!rows.length){ return done(null, false, req.flash('message','Invalid username or password.')); }
//     // salt = salt+''+password;
//     // var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
//     // var dbPassword  = rows[0].password;
//     // if(!(dbPassword == encPassword)){
//     //     return done(null, false, req.flash('message','Invalid username or password.'));
//     //  }
//     // return done(null, rows[0]);
//     // });

//     }
//     ));



   
//  }
// );


// router.post("/login",
//     check('email').not().isEmpty().withMessage('Email Id field is required').isEmail().withMessage('Please enter a Valid Email'),
//     check('password').not().isEmpty().withMessage('Password field is required'),
//     function(req, res){
//     const errors = validationResult(req);
//     //console.log(errors);
//     if(!errors.isEmpty()){
//       //res.end();
//        res.render('login', {page:'Login', menuId:'login',error: errors.mapped(),successMsg: req.flash('successMsg'),errorMsg: req.flash('errorMsg')});
//     }else{
//       userController.login(req,res);

//     } 
//   }
// );

router.get("/profile",function(req,res){
  //console.log(req.user);
  var loggedin={};
  if(req.user){
    loggedin=1;
  }
  res.render('profile', {page:'User Profile', sessionUser:loggedin,menuId:'User profile'});
});

router.get("/userregistration",function(req,res){
	res.render('registration', {error: {}, page:'User Registration', menuId:'registration',fulldata:{},successMsg: req.flash('successMsg'),errorMsg: req.flash('errorMsg')});
});


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
			//res.end();
			 res.render('registration', {fulldata:req.body,page:'User Registration', menuId:'registration', error: errors.mapped()});
		}else{
			userController.register(req,res);

		}	
	}
	
);

module.exports=router;