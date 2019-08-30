const Cryptr = require('cryptr');
const cryptr = new Cryptr('secretKeys');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('req-flash');
//var flash = require('connect-flash');
var express=require("express");
var connection = require('./../config/config');



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
                console.log(req.body);
               // res.end();
               var file_name = ''; 
               if(req.file){
                file_name = req.file.originalname;
                }
                // var updatedata={
                // "username":req.body.username,
                // "profile_img":file_name
                // }
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
}
// user profile update controller function end from here



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



