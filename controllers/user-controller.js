const Cryptr = require('cryptr');
const cryptr = new Cryptr('secretKeys');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('req-flash');
//var flash = require('connect-flash');
var express=require("express");
var connection = require('./../config/config');




module.exports.register=function(req,res){
    console.log(req.body);
    var today = new Date();
    var encryptedString =cryptr.encrypt(req.body.password);
    var users={
        "username":req.body.username,
        "email":req.body.email,
        "password":encryptedString,
        "created_at":today
    }
    console.log(users);
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error) {

        req.flash("error_msg", "there are some error with query.");
        return res.redirect("registration");

        // res.json({
        //     status:false,
        //     message:'there are some error with query'
        // })

      }else{
          //on success
         req.flash("success_msg", "Registration successfully done.");
        return res.redirect("registration");

        //res.render('registration', {user : undefined, success :true,successs :true,error: err});
         /* res.json({
            status:true,
            data:results,
            message:'user registered sucessfully'
        })*/

      }
    });
}
