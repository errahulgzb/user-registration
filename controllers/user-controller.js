var Cryptr = require('cryptr');
var express=require("express");
var connection = require('./../config/config');


module.exports.register=function(req,res){
    var today = new Date();
  var encryptedString = Cryptr.encrypt(req.body.password);
    var users={
        "name":req.body.username,
        "email":req.body.email,
        "password":encryptedString,
        "created_at":today,
        "updated_at":today
    }
    console.log(users);
    // connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
    //   if (error) {
    //     res.json({
    //         status:false,
    //         message:'there are some error with query'
    //     })
    //   }else{
    //       res.json({
    //         status:true,
    //         data:results,
    //         message:'user registered sucessfully'
    //     })
    //   }
    // });
}


function encrypt(text){
    var cipher = crypto.createCipher('aes-256-cbc','d6f3Efeq');
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}