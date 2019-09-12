const Cryptr = require('cryptr');
const cryptr = new Cryptr('secretKeys');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('req-flash');
//var flash = require('connect-flash');
var express=require("express");
var connection = require('./../config/config');
var path = require("path");
var fs = require("fs");

// user registration controller function start from here
module.exports.register=function(req,res){
   
                //code if no user with entered email was found
                var today = new Date();
                var encryptedString =cryptr.encrypt(req.body.password);
                var users={
                "username":req.body.username,
                "email":req.body.email,
                "password":encryptedString,
                "created_at":today
                }

                connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
                if (error) {
                 req.flash('errorMsg', 'User Registration failed!.');
                 return res.redirect("userregistration");
                }else{
                //on success
                req.flash('successMsg', 'User Registration successfully done!.');
                return res.redirect("userregistration");
                }
                });
}
// user registration controller function end from here

// user profile update controller function start from here
module.exports.updateprofile=function(req,res){
                
                var today= Number(new Date());
               // res.end();
               var file_name = ''; 
               if(req.file){
                file_name = today+req.file.originalname;
                
                // file removing from server uploading directory start from here
                  connection.query("SELECT id,email,profile_img FROM users WHERE email=?",[req.body.email],function(err, results, fields){
                    if(results[0].profile_img !=""){
                        const targetPath = path.join('public', "./uploads/"+results[0].profile_img);
                        fs.unlink(targetPath, function (err) {
                        if (err) throw err;
                            // if no error, file has been deleted successfully
                            console.log('File deleted!');
                        });
                    }
                   })
                // file removing from server uploading directory end from here

                // file uploading to server uploading directory start from here
                  const tempPath = req.file.path;
                  const targetPath = path.join('public', "./uploads/"+today+req.file.originalname);
                  fs.rename(tempPath, targetPath, err => {
                  if (err) return handleError(err, res);

                  });
                // file uploading to server uploading directory end from here
                 
                
               // user data updating query from start here
                var sqlquery="UPDATE users SET username= ?,profile_img=? WHERE email = ?";
                connection.query(sqlquery,[req.body.username,file_name,req.body.email], function (error, results, fields) {
                if (error) {
                 req.flash('errorMsg', 'User profile update failed!.');
                 return res.redirect("editprofile");
                }else{
                //on success
                req.flash('successMsg', 'User profile update successfully done!');
                return res.redirect("editprofile");
                }
                });
               }else{

                // user data updating query from start here
                var sqlquery="UPDATE users SET username= ? WHERE email = ?";
                connection.query(sqlquery,[req.body.username,req.body.email], function (error, results, fields) {
                if (error) {
                 req.flash('errorMsg', 'User profile update failed!.');
                 return res.redirect("editprofile");
                }else{
                //on success
                req.flash('successMsg', 'User profile update successfully done!');
                return res.redirect("editprofile");
                }
                });

               }
                // user data updating query from end here
}
// user profile update controller function end from here

// show all user list 

module.exports.alluserlist=function(req,res){
  connection.query('SELECT * FROM users ORDER BY created_at DESC',function(error, results, fields){

    var loggedin=userdetail={};
    if(req.user){
      loggedin=1;
      userdetail=JSON.parse(JSON.stringify(req.user));
    }
   // console.log(results);
  res.render('userlist', {page:'User List', sessionUser:loggedin,menuId:'User List',userdetail:userdetail,successMsg: req.flash('successMsg'),errorMsg: req.flash('errorMsg'),userlists:results});

  });
   
}
// user detail by user id


// user detail update controller function start from here
module.exports.updateuserdetailbyid=function(req,res){
                
  var today= Number(new Date());
 // res.end();
 var file_name = ''; 
 if(req.file){
  file_name = today+req.file.originalname;
  
  // file removing from server uploading directory start from here
    connection.query("SELECT id,email,profile_img FROM users WHERE id=?",[req.params.user_id],function(err, results, fields){
      if(results[0].profile_img !=""){
          const targetPath = path.join('public', "./uploads/"+results[0].profile_img);
          fs.unlink(targetPath, function (err) {
          if (err) throw err;
              // if no error, file has been deleted successfully
              console.log('File deleted!');
          });
      }
     })
  // file removing from server uploading directory end from here

  // file uploading to server uploading directory start from here
    const tempPath = req.file.path;
    const targetPath = path.join('public', "./uploads/"+today+req.file.originalname);
    fs.rename(tempPath, targetPath, err => {
    if (err) return handleError(err, res);

    });
  // file uploading to server uploading directory end from here
   
  
 // user data updating query from start here
  var sqlquery="UPDATE users SET username= ?,profile_img=? WHERE id = ?";
  connection.query(sqlquery,[req.body.username,file_name,req.params.user_id], function (error, results, fields) {
      if (error) {
      req.flash('errorMsg', 'User detail update failed!.');
      return res.redirect("/userlist");
      }else{
      //on success
      req.flash('successMsg', 'User detail update successfully done!');
      return res.redirect("/userlist");
      }
  });
 }else{

  // user data updating query from start here
  var sqlquery="UPDATE users SET username= ? WHERE id = ?";
  connection.query(sqlquery,[req.body.username,req.params.user_id], function (error, results, fields) {
      if (error) {
      req.flash('errorMsg', 'User detail update failed!.');
      return res.redirect("/userlist");
      }else{
      //on success
      req.flash('successMsg', 'User detail update successfully done!');
      return res.redirect("/userlist");
      }
  });

 }
  // user data updating query from end here
};
// user detail update controller function end from here


module.exports.getuserdetailbyid=function(userid,cb){
connection.query("SELECT * FROM users WHERE id=?",userid,function(errors,results,fields){
if(errors) console.log(errors);
 //console.log(results);
return cb(null, results);
});
};

// login controller function start from here

module.exports.findByEmail = function(username, cb){

connection.query('SELECT * FROM users WHERE email = ?', username, function (error, results, fields) {
if (error) console.log(error);

// console.log(results);
return cb(null, results);
});
};


module.exports.login=function(req,cb){
        var email= req.body.email;
        var password= req.body.password;
        connection.query("SELECT id,email,password FROM users WHERE email=?",[email],function(err, results, fields){
            if (err) {
               // req.flash('errorMsg', 'Some thing wrong with query!.');
               return cb(3, null);
               //  return res.redirect("login");
            }else {
               
               if(results.length >0){
                    if(cryptr.decrypt(results[0].password) == password){
                        //req.session.email = email;
                       // req.session.user_id = results[0].id;
                       return cb(null, results);
                       // return res.redirect("profile"); 
                    }else{
                      return cb(1, null);
                    }

                }else{
                  return cb(2, null);
                // req.flash('errorMsg', 'Email Id doesnot exist!.');
                 //return res.redirect("login"); 
                }

            }
        })


}
// login controller function end from here



// duplicate email id check from this function
module.exports.findRepByEmail=function(email,cb){
            //console.log(email);
           connection.query('SELECT count(id) as count FROM users WHERE email = ?', email.email, function(err, rows,fields) {
            if (err) {
                //console.log(err);
                return cb(err, null);
            } else {
              //console.log(rows);
                return cb(null, rows);
                }
        });
}

exports.findById = function(id, cb) {

  connection.query('SELECT * FROM users WHERE id = ?', id, function (error, results, fields) {
    
    if (results) {
      cb(null, results);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });

}

// duplicate email id check from this function



