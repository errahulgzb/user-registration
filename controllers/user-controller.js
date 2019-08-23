const Cryptr = require('cryptr');
const cryptr = new Cryptr('secretKeys');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('req-flash');
//var flash = require('connect-flash');
var express=require("express");
var connection = require('./../config/config');




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

                //req.flash("error_msg", "there are some error with query.");
                return res.redirect("userregistration");
                }else{
                //on success
                // req.flash("success_msg", "Registration successfully done.");
                return res.redirect("userregistration");
                }
                });
          

   
}


module.exports.findRepByEmail=function(req,res){
           var email=req.body.email;
           console.log(email);
             connection.query('SELECT id FROM users WHERE email = ?', email, function(err, rows) {
            if (err) {
                return(err, null);
            } else {
              console.log(rows[0].id);
                return(null, rows[0].id);
                }
        });
}




