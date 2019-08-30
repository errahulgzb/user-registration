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
 var loggedin={};
  if(req.user){
    loggedin=1;
  }
	res.render('index', {sessionUser:loggedin,page:'Home', menuId:'home'});
});
router.get("/about",function(req,res){
  var loggedin={};
  if(req.user){
    loggedin=1;
  }
	res.render('aboutus', {sessionUser:loggedin,page:'About Us', menuId:'aboutus'});
});

router.get("/login",function(req,res){
  var loggedin={};
  if(req.user){
    loggedin=1;
  }
	res.render('login', {sessionUser:loggedin,page:'Login', menuId:'login',error: {},successMsg: req.flash('successMsg'),errorMsg: req.flash('errorMsg')});
});

// router.post('/login',checkEmail,passport.authenticate('local', {failureRedirect: '/login'}),
//         function(req, res){
//           res.redirect("profile");
//       }
// );

// function checkEmail(req,res,next){
//   check('email').not().isEmpty().withMessage('Email Id field is required').isEmail().withMessage('Please enter a Valid Email'),
//      check('password').not().isEmpty().withMessage('Password field is required'),
//      check('email').custom((value, { req }) => {
//       return new Promise((resolve, reject) => {
//          userController.findRepByEmail({ 'email': value }, (err, rep) => {
//           if(rep[0].count==0) {
//             //console.log(rep[0].count);
//                 return reject();
//             } else {
//               //console.log("test");
//                 return resolve();
//             }
        
//          });
//       });
//    }).withMessage('Email Id doesnt exists.'),
//   // passport.authenticate('local', {failureRedirect: '/login'}),
//    function(req, res){
//     const errors = validationResult(req);
//     //console.log(errors);
//     if(!errors.isEmpty()){
//         var loggedin={};
//         if(req.user){
//         loggedin=1;
//         }
//        res.render('login',{sessionUser:loggedin,page:'Login', menuId:'login',error: errors.mapped(),successMsg: req.flash('successMsg'),errorMsg: req.flash('errorMsg')});
//     }else{
//      next();
//     }
//   }
// }

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
function isAuthenticated(req, res, next) {
  // do any checks you want to in here

  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  if (req.user)
      return next();
// IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect('/login');
}

router.get("/profile",isAuthenticated,function(req,res){
  //console.log(req.user);
  var loggedin={};
  if(req.user){
    loggedin=1;
  }
  res.render('profile', {page:'User Profile', sessionUser:loggedin,menuId:'User profile'});
});

router.get("/userregistration",function(req,res){
  var loggedin={};
  if(req.user){
    loggedin=1;
  }
	res.render('registration', {sessionUser:loggedin,error: {}, page:'User Registration', menuId:'registration',fulldata:{},successMsg: req.flash('successMsg'),errorMsg: req.flash('errorMsg')});
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